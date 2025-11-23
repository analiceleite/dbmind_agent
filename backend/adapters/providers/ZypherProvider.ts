import type { ModelProvider } from "./ModelProvider.ts";
import { ZypherAgent } from "@corespeed/zypher";
import { pool } from "../database/DatabaseConnection.ts";
import * as HistoryRepo from "../database/HistoryRepository.ts";

export class ZypherProvider implements ModelProvider {
  private agent: ZypherAgent;
  private dbSchema: string;

  constructor(agent: ZypherAgent) {
    this.agent = agent;
    this.dbSchema = this.getDatabaseSchema();
  }

  private getDatabaseSchema(): string {
    return `
Database Schema:
- budgets: id, department, year, amount
- debts: id, creditor, amount, due_date, paid
- suppliers: id, name, contact_email, phone, city
- customers: id, name, email, phone, city, registration_date
- products: id, name, category, price, stock_quantity, supplier_id
- employees: id, name, position, salary, hire_date, department
- sales: id, customer_id, product_id, employee_id, quantity, unit_price, total_amount, sale_date
- invoices: id, supplier_id, amount, issue_date, due_date, paid
    `.trim();
  }

  /**
   * Generates SQL and executes the query in one step
   */
  private async queryDatabase(
    prompt: string,
  ): Promise<{ rows: unknown[] | null; sql?: string | null } | null> {
    const sqlTask =
      `You are an expert SQL query generator. The target database is PostgreSQL — make sure any SQL you generate is Postgres-compatible. Based on the following database schema:

${this.dbSchema}

Generate the most appropriate SQL query to answer the user's question: "${prompt}"

- If the question requires retrieving data, use SELECT and limit results to 10 rows if applicable.
- Ensure the query is valid and directly executable.
- Use PostgreSQL-compatible functions and date/interval syntax (e.g. prefer "CURRENT_DATE - INTERVAL '6 months'" instead of MySQL's DATE_SUB(...)).
- Output ONLY the SQL query, with no explanations, comments, or code blocks.`;

    const sqlEvent$ = this.agent.runTask(sqlTask, "claude-3-5-haiku-20241022");
    const { eachValueFrom } = await import("rxjs-for-await");

    let sqlQuery = "";
    for await (const event of eachValueFrom(sqlEvent$)) {
      if (event.type === "text" && "content" in event && event.content) {
        sqlQuery += event.content;
      }
    }

    // Clean up SQL
    sqlQuery = sqlQuery.trim();

    // Normalize boolean comparisons for PostgreSQL
    sqlQuery = sqlQuery
      .replace(/paid\s*=\s*0/g, "paid = false")
      .replace(/paid\s*=\s*1/g, "paid = true");

    // Normalize MySQL DATE_SUB(...) and INTERVAL syntax to PostgreSQL-compatible form
    // Examples:
    //   DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH) -> CURRENT_DATE - INTERVAL '6 months'
    //   DATE_SUB(NOW(), INTERVAL 7 DAY) -> NOW() - INTERVAL '7 days'
    sqlQuery = sqlQuery.replace(/DATE_SUB\(\s*(NOW\(\)|CURRENT_DATE)\s*,\s*INTERVAL\s+(\d+)\s+(DAY|DAYS|MONTH|MONTHS|YEAR|YEARS|HOUR|HOURS)\s*\)/gi,
      (_match, dateFn: string, count: string, unit: string) => {
        const unitBase = unit.toLowerCase().replace(/s$/, "");
        const normalizedUnit = `${unitBase}s`;
        return `${dateFn} - INTERVAL '${count} ${normalizedUnit}'`;
      });

    // Convert bare INTERVAL <num> <unit> to quoted interval literal when missing quotes
    sqlQuery = sqlQuery.replace(/INTERVAL\s+(\d+)\s+(DAY|DAYS|MONTH|MONTHS|YEAR|YEARS|HOUR|HOURS)(?!\s*')/gi,
      (_match, count: string, unit: string) => {
        const unitBase = unit.toLowerCase().replace(/s$/, "");
        const normalizedUnit = `${unitBase}s`;
        return `INTERVAL '${count} ${normalizedUnit}'`;
      });

    console.log(`[ZypherProvider] SQL: ${sqlQuery}`);

    // Execute query
    const client = await pool.connect();
    try {
      const result = await client.queryObject(sqlQuery);
      return {
        rows: result.rows.length > 0 ? result.rows : null,
        sql: sqlQuery,
      };
    } catch (error) {
      console.error("[ZypherProvider] Query error:", error);
      return null;
    } finally {
      client.release();
    }
  }

  async *streamResponse(
    prompt: string,
    model?: string,
    _system?: string,
    sessionId?: string,
  ): AsyncIterable<string> {
    const startTime = Date.now();
    const selectedModel = model || "claude-3-5-haiku-20241022";

    console.log(`[ZypherProvider] Processing: "${prompt}"`);

    const dataResult = await this.queryDatabase(prompt);

    if (!dataResult || !dataResult.rows) {
      // Be polite but concise when no data is found
      yield "I looked through the database but couldn't find any matching records. Could you try rephrasing or give more details?";
      try {
        await HistoryRepo.createHistory(
          prompt,
          selectedModel,
          null,
          "no data",
          sessionId ?? null,
        );
      } catch (e) {
        console.error(
          "[ZypherProvider] failed to persist empty query history",
          e,
        );
      }
      return;
    }

    console.log(
      `[ZypherProvider] Data retrieved in ${Date.now() - startTime}ms`,
    );

    // Limit data to prevent memory issues
    const limitedData = dataResult.rows.length > 10
      ? dataResult.rows.slice(0, 10)
      : dataResult.rows;

    // Check if it's a scalar result (e.g., COUNT, SUM)
    const isScalar = limitedData.length === 1 &&
      typeof limitedData[0] === "object" &&
      Object.keys(limitedData[0] as Record<string, unknown>).length === 1;

    let dataText: string;
    if (isScalar) {
      // For scalar results, just use the value
      const obj = limitedData[0] as Record<string, unknown>;
      const val = Object.values(obj)[0];
      dataText = val !== undefined && val !== null ? String(val) : "0";
    } else {
      // Format data as text
      dataText = (limitedData as Record<string, unknown>[]).map((row) => {
        // Try to format nicely, fallback to JSON if columns don't match
        const r = row as Record<string, unknown>;
        if (
          typeof r.name === "string" && typeof r.category === "string" &&
          r.price !== undefined
        ) {
          return `${r.name} (${r.category}, $${r.price})`;
        } else {
          return Object.entries(r).map(([k, v]) => `${k}: ${v}`).join(", ");
        }
      }).join(", ");
    }

    // 2. Build direct and concise prompt
    const finalPrompt = `You have this data from the database: ${dataText}

The user's question is: ${prompt}

Provide a direct answer based only on this data. Do not repeat the question, do not mention SQL queries, and do not show the data again. Just give the factual answer.`; // 3. Stream response
    const event$ = this.agent.runTask(finalPrompt, selectedModel);
    const { eachValueFrom } = await import("rxjs-for-await");

    let hasResponse = false;
    let fullAnswer = "";
    try {
      for await (const event of eachValueFrom(event$)) {
        if (event.type === "text" && "content" in event && event.content) {
          fullAnswer += event.content;
          if (!hasResponse) {
            // Send a short, polite greeting once before the first streamed content
            yield "Here is a concise answer based on the data.";
            console.log(
              `[ZypherProvider] First response in ${Date.now() - startTime}ms`,
            );
            hasResponse = true;
          }
          // Stream the LLM content afterwards
          yield event.content;
        } else if (event.type === "cancelled") {
          break;
        }
      }

      if (!hasResponse) {
        // Keep the message friendly and actionable
        yield "Apologies — I'm having trouble generating a response right now. Please try again in a moment.";
      }

      // Persist the completed query and answer
      try {
        const sql = dataResult.sql ?? null;
        await HistoryRepo.createHistory(
          prompt,
          selectedModel,
          sql,
          fullAnswer,
          sessionId ?? null,
        );
      } catch (e) {
        console.error("[ZypherProvider] failed to persist query history", e);
      }
    } catch (error) {
      console.error(`[ZypherProvider] Error:`, error);
      yield "Sorry — an unexpected error occurred while processing your request. Please try again later.";
    }

    console.log(`[ZypherProvider] Completed in ${Date.now() - startTime}ms`);
  }
}
