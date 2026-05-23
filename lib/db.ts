import "server-only";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

export type Schema = typeof schema;
export type DB = BetterSQLite3Database<Schema>;

let cachedLocalDb: DB | null = null;

function isCloudflare(): boolean {
  return Boolean(
    process.env.CF_PAGES ||
      process.env.WORKERS_CI ||
      (globalThis as { navigator?: { userAgent?: string } }).navigator?.userAgent?.includes(
        "Cloudflare-Workers",
      ),
  );
}

async function getLocalDb(): Promise<DB> {
  if (cachedLocalDb) return cachedLocalDb;

  const { default: Database } = await import("better-sqlite3");
  const { drizzle } = await import("drizzle-orm/better-sqlite3");
  const path = await import("node:path");
  const fs = await import("node:fs");

  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const conn = new Database(path.join(dir, "renocheck.db"));
  conn.pragma("journal_mode = WAL");
  conn.pragma("foreign_keys = ON");
  conn.exec(LOCAL_SCHEMA_SQL);

  cachedLocalDb = drizzle(conn, { schema });

  await seedAdminIfEmpty(cachedLocalDb);
  return cachedLocalDb;
}

async function getCloudflareDb(): Promise<DB> {
  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const { drizzle } = await import("drizzle-orm/d1");
  const { env } = getCloudflareContext();
  const binding = (env as { DB?: unknown }).DB;
  if (!binding) {
    throw new Error(
      "Cloudflare D1 binding 'DB' is missing. Configure it in wrangler.jsonc and the Pages dashboard.",
    );
  }
  // D1 and better-sqlite3 drizzle adapters expose the same query-builder
  // surface; await is a no-op on sync results so we type both as DB.
  return drizzle(binding as Parameters<typeof drizzle>[0], { schema }) as unknown as DB;
}

export async function getDb(): Promise<DB> {
  if (isCloudflare()) return getCloudflareDb();
  return getLocalDb();
}

export { schema };

/* ------------------------------------------------------------------ */
/*  Seed default admin if users table is empty (local dev convenience) */
/* ------------------------------------------------------------------ */

async function seedAdminIfEmpty(db: DB) {
  const { hashPassword } = await import("./passwords");
  const { randomUUID } = await import("node:crypto");

  const rows = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .limit(1);
  if (rows.length > 0) return;

  const email = "admin@renocheck.be";
  const password = "admin123";
  await db.insert(schema.users).values({
    id: randomUUID(),
    email,
    password_hash: hashPassword(password),
    full_name: "Beheerder",
    role: "admin",
  });

  console.log(
    `\n[renocheck] Geen users in DB — standaard admin aangemaakt:\n  email:    ${email}\n  password: ${password}\nWijzig of verwijder via /dashboard/beheer.\n`,
  );
}

/* ------------------------------------------------------------------ */
/*  Local-only inline schema bootstrap                                  */
/* ------------------------------------------------------------------ */

const LOCAL_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  company TEXT,
  region TEXT,
  rubriek TEXT,
  partner_type TEXT,
  role TEXT NOT NULL DEFAULT 'partner' CHECK (role IN ('admin','partner')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  starts_at TEXT NOT NULL,
  ends_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events(starts_at);

CREATE TABLE IF NOT EXISTS partner_applications (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  contact_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  partner_type TEXT,
  region TEXT,
  rubriek TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','accepted','declined')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON partner_applications(created_at DESC);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  region TEXT,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  subject_type TEXT NOT NULL CHECK (subject_type IN ('membership','videocall','question','other')),
  first_name TEXT NOT NULL,
  last_name TEXT,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','closed')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
`;
