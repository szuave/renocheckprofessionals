import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { hashPassword } from "./passwords";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "renocheck.db");

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

declare global {
  // eslint-disable-next-line no-var
  var __renocheck_db: Database.Database | undefined;
}

function open(): Database.Database {
  const conn = new Database(DB_FILE);
  conn.pragma("journal_mode = WAL");
  conn.pragma("foreign_keys = ON");

  conn.exec(`
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
  `);

  seedAdminIfEmpty(conn);
  return conn;
}

function seedAdminIfEmpty(conn: Database.Database) {
  const row = conn.prepare("SELECT COUNT(*) AS c FROM users").get() as { c: number };
  if (row.c > 0) return;

  const id = randomUUID();
  const email = "admin@renocheck.be";
  const password = "admin123";
  conn
    .prepare(
      `INSERT INTO users (id, email, password_hash, full_name, role)
       VALUES (?, ?, ?, ?, 'admin')`,
    )
    .run(id, email, hashPassword(password), "Beheerder");

  console.log(
    `\n[renocheck] Geen users in DB — standaard admin aangemaakt:\n  email:    ${email}\n  password: ${password}\nWijzig of verwijder via /dashboard/beheer.\n`,
  );
}

export const db: Database.Database = globalThis.__renocheck_db ?? open();
if (process.env.NODE_ENV !== "production") {
  globalThis.__renocheck_db = db;
}
