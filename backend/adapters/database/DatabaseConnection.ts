// deno-lint-ignore no-import-prefix
import { Pool } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const pool = new Pool({
  user: Deno.env.get("POSTGRES_USER"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: Deno.env.get("POSTGRES_DB"),
  hostname: "131.161.43.4",
  port: 5432,
}, 3);

export { pool };