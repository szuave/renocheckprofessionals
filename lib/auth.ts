import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes, randomUUID } from "node:crypto";
import { db } from "./db";
import { hashPassword, verifyPassword } from "./passwords";
import type { Role, User } from "./types";

export const SESSION_COOKIE = "renocheck_session";
const SESSION_DAYS = 30;

type UserRow = User & { password_hash?: string };

const USER_COLS =
  "id, email, full_name, company, region, rubriek, partner_type, role, created_at";

function rowToUser(row: UserRow | undefined): User | null {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    full_name: row.full_name ?? null,
    company: row.company ?? null,
    region: row.region ?? null,
    rubriek: row.rubriek ?? null,
    partner_type: row.partner_type ?? null,
    role: row.role as Role,
    created_at: row.created_at,
  };
}

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = db
    .prepare(
      `SELECT ${USER_COLS.split(",").map((c) => `u.${c.trim()}`).join(", ")}
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > strftime('%Y-%m-%dT%H:%M:%fZ','now')`,
    )
    .get(token) as UserRow | undefined;

  return rowToUser(row);
}

export async function requireUser(redirectTo = "/dashboard"): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    const next = encodeURIComponent(redirectTo);
    redirect(`/login?next=${next}`);
  }
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/dashboard");
  return user;
}

export type SignInResult =
  | { ok: true; user: User }
  | { ok: false; error: "invalid" };

export async function signIn(
  email: string,
  password: string,
): Promise<SignInResult> {
  const row = db
    .prepare(
      `SELECT ${USER_COLS}, password_hash FROM users WHERE email = ? COLLATE NOCASE`,
    )
    .get(email.trim()) as UserRow | undefined;

  if (!row?.password_hash || !verifyPassword(password, row.password_hash)) {
    return { ok: false, error: "invalid" };
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  db.prepare(
    "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)",
  ).run(token, row.id, expiresAt);

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });

  return { ok: true, user: rowToUser(row)! };
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
  }
  store.delete(SESSION_COOKIE);
}

export type CreateUserInput = {
  email: string;
  password: string;
  full_name?: string | null;
  company?: string | null;
  region?: string | null;
  rubriek?: string | null;
  partner_type?: string | null;
  role?: Role;
};

export function createUser(input: CreateUserInput): User {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO users (id, email, password_hash, full_name, company, region, rubriek, partner_type, role)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.email.trim(),
    hashPassword(input.password),
    input.full_name?.trim() || null,
    input.company?.trim() || null,
    input.region?.trim() || null,
    input.rubriek?.trim() || null,
    input.partner_type?.trim() || null,
    input.role ?? "partner",
  );

  const row = db
    .prepare(`SELECT ${USER_COLS} FROM users WHERE id = ?`)
    .get(id) as UserRow;
  return rowToUser(row)!;
}

export function setUserRole(id: string, role: Role): void {
  db.prepare("UPDATE users SET role = ? WHERE id = ?").run(role, id);
}

export function deleteUser(id: string): void {
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
}
