// deno-lint-ignore no-import-prefix
import { Pool } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const pool = new Pool({
  user: Deno.env.get("POSTGRES_USER"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: Deno.env.get("POSTGRES_DB"),
  hostname: Deno.env.get("POSTGRES_HOST") ?? "postgres",
  port: Number(Deno.env.get("POSTGRES_PORT") ?? "5432"),
}, 3);

export { pool };