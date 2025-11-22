import { pool } from './DatabaseConnection.ts';

export interface HistoryRecord {
  id: number;
  session_id: string | null;
  question: string;
  model: string | null;
  sql_query: string | null;
  answer: string | null;
  created_at: string;
}

export async function createHistory(
  question: string,
  model?: string | null,
  sql_query?: string | null,
  answer?: string | null,
  session_id?: string | null,
): Promise<HistoryRecord | null> {
  const client = await pool.connect();
  try {
    const result = await client.queryObject<HistoryRecord>(
      `INSERT INTO query_history (session_id, question, model, sql_query, answer)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [session_id ?? 'default', question, model ?? null, sql_query ?? null, answer ?? null],
    );
    return result.rows && result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    console.error('[HistoryRepository] createHistory error', err);
    return null;
  } finally {
    client.release();
  }
}

export async function listHistory(limit = 50): Promise<HistoryRecord[]> {
  const client = await pool.connect();
  try {
    const result = await client.queryObject<HistoryRecord>(
      `SELECT * FROM query_history ORDER BY created_at DESC LIMIT $1;`,
      [limit],
    );
    return result.rows ?? [];
  } catch (err) {
    console.error('[HistoryRepository] listHistory error', err);
    return [];
  } finally {
    client.release();
  }
}

export async function getHistoryById(id: number): Promise<HistoryRecord | null> {
  const client = await pool.connect();
  try {
    const result = await client.queryObject<HistoryRecord>(
      `SELECT * FROM query_history WHERE id = $1 LIMIT 1;`,
      [id],
    );
    return result.rows && result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    console.error('[HistoryRepository] getHistoryById error', err);
    return null;
  } finally {
    client.release();
  }
}

export async function updateHistory(id: number, fields: Partial<Pick<HistoryRecord, 'question' | 'model' | 'sql_query' | 'answer'>>): Promise<HistoryRecord | null> {
  const client = await pool.connect();
  try {
    // build set clause dynamically
    const allowed = ['question', 'model', 'sql_query', 'answer'] as const;
    const presentKeys = allowed.filter((k) => (fields as Record<string, unknown>)[k] !== undefined) as Array<typeof allowed[number]>;
    if (presentKeys.length === 0) return getHistoryById(id);
    const setParts: string[] = [];
    const args: unknown[] = [];
    presentKeys.forEach((k, i) => {
      setParts.push(`${k} = $${i + 1}`);
      // push the value for the key
      args.push((fields as Record<string, unknown>)[k]);
    });
    args.push(id);

    const query = `UPDATE query_history SET ${setParts.join(', ')} WHERE id = $${args.length} RETURNING *;`;
    const result = await client.queryObject<HistoryRecord>(query, args);
    return result.rows && result.rows.length ? result.rows[0] : null;
  } catch (err) {
    console.error('[HistoryRepository] updateHistory error', err);
    return null;
  } finally {
    client.release();
  }
}

export async function deleteHistory(id: number): Promise<boolean> {
  const client = await pool.connect();
  try {
    await client.queryObject('DELETE FROM query_history WHERE id = $1;', [id]);
    return true;
  } catch (err) {
    console.error('[HistoryRepository] deleteHistory error', err);
    return false;
  } finally {
    client.release();
  }
}
