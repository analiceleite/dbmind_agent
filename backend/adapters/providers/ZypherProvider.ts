import type { ModelProvider } from './ModelProvider.ts';
import { ZypherAgent } from "@corespeed/zypher";
import { pool } from '../database/DatabaseConnection.ts';

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
- customers: id, name, email, phone, city
- products: id, name, category, price
- employees: id, name, position, salary
- sales: id, customer_id, product_id, employee_id, quantity, sale_date
    `.trim();
  }

  /**
   * Generates SQL and executes the query in one step
   */
  private async queryDatabase(prompt: string): Promise<any[] | null> {
    const sqlTask = `${this.dbSchema}

Generate ONLY a SQL SELECT query to answer: ${prompt}
Limit the results to 10 rows if applicable.
Return only the SQL, no explanations.`;

    const sqlEvent$ = this.agent.runTask(sqlTask, "phi3:mini");
    const { eachValueFrom } = await import("rxjs-for-await");

    let sqlQuery = "";
    for await (const event of eachValueFrom(sqlEvent$)) {
      if (event.type === 'text' && 'content' in event && event.content) {
        sqlQuery += event.content;
      }
    }

    // Clean up SQL
    sqlQuery = sqlQuery.trim()
      .replace(/^```sql\s*/, '')
      .replace(/\s*```$/, '')
      .replace(/^```\s*/, '')
      .trim();

    if (!sqlQuery.toUpperCase().startsWith('SELECT')) {
      return null;
    }

    console.log(`[ZypherProvider] SQL: ${sqlQuery}`);

    // Execute query
    const client = await pool.connect();
    try {
      const result = await client.queryObject(sqlQuery);
      return result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error("[ZypherProvider] Query error:", error);
      return null;
    } finally {
      client.release();
    }
  }

  async* streamResponse(prompt: string, model?: string): AsyncIterable<string> {
    const startTime = Date.now();
    const selectedModel = model || "phi3:mini";

    console.log(`[ZypherProvider] Processing: "${prompt}"`);

    // 1. Fetch data from database
    const data = await this.queryDatabase(prompt);

    if (!data) {
      yield "I don't have that information in the database.";
      return;
    }

    console.log(`[ZypherProvider] Data retrieved in ${Date.now() - startTime}ms`);

    // Limit data to prevent memory issues
    const limitedData = data.length > 10 ? data.slice(0, 10) : data;

    // 2. Build direct and concise prompt
    const finalPrompt = `You have this data from the database: ${JSON.stringify(limitedData)}

The user's question is: ${prompt}

Provide a direct answer based only on this data. Do not repeat the question, do not mention SQL queries, and do not show the data again. Just give the factual answer.`;    // 3. Stream response
    const event$ = this.agent.runTask(finalPrompt, selectedModel);
    const { eachValueFrom } = await import("rxjs-for-await");

    let hasResponse = false;
    try {
      for await (const event of eachValueFrom(event$)) {
        if (event.type === 'text' && 'content' in event && event.content) {
          if (!hasResponse) {
            console.log(`[ZypherProvider] First response in ${Date.now() - startTime}ms`);
            hasResponse = true;
          }
          yield event.content;
        } else if (event.type === 'cancelled') {
          break;
        }
      }

      if (!hasResponse) {
        yield "Unable to process your request.";
      }
    } catch (error) {
      console.error(`[ZypherProvider] Error:`, error);
      yield "Error processing your request.";
    }

    console.log(`[ZypherProvider] Completed in ${Date.now() - startTime}ms`);
  }
}