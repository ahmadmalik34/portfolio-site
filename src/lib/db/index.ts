import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type Database = NeonHttpDatabase<typeof schema>;

let _db: Database | null = null;

/** True when a NeonDB connection string is configured. */
export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Lazily created Neon (serverless Postgres) client via Drizzle.
 * Returns `null` when DATABASE_URL is not set — callers fall back to demo data.
 */
export function getDb(): Database | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!_db) {
    _db = drizzle(neon(url), { schema });
  }
  return _db;
}
