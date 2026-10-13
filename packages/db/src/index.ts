import { drizzle as drizzleNodePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env["DATABASE_URL"]) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const connectionString = process.env["DATABASE_URL"];

/**
 * Detect whether the DATABASE_URL points to a Neon serverless endpoint.
 * Neon pooler hostnames look like: ep-<adjective>-<noun>-<id>.{region}.aws.neon.tech
 * Using the Neon HTTP driver here avoids TCP connection timeouts in
 * serverless/edge environments (Netlify Functions, Vercel, etc.).
 */
function isNeonUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return hostname.endsWith(".neon.tech");
  } catch {
    return false;
  }
}

export const db = isNeonUrl(connectionString)
  ? drizzleNeon(neon(connectionString), { schema })
  : drizzleNodePg(new Pool({ connectionString }), { schema });

/**
 * pool is only available when using node-postgres (non-Neon environments).
 * Prefer using `db` directly; this export exists for graceful shutdown.
 */
export const pool = isNeonUrl(connectionString)
  ? null
  : new Pool({ connectionString });

export * from "./schema";
