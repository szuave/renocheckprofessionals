import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes, randomUUID } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import { getDb, schema } from "./db";
import { hashPassword, verifyPassword } from "./passwords";
import type { Role, User } from "./types";

const { users, sessions } = schema;

export const SESSION_COOKIE = "renocheck_session";
const SESSION_DAYS = 30;

const userColumns = {
  id: users.id,
  email: users.email,
  full_name: users.full_name,
  company: users.company,
  region: users.region,
  regions: users.regions,
  rubriek: users.rubriek,
  rubrieken: users.rubrieken,
  partner_type: users.partner_type,
  slug: users.slug,
  role: users.role,
  created_at: users.created_at,
};

function nowIso(): string {
  return new Date().toISOString();
}

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = await getDb();
  const rows = await db
    .select(userColumns)
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.user_id))
    .where(and(eq(sessions.token, token), gt(sessions.expires_at, nowIso())))
    .limit(1);

  return (rows[0] as User | undefined) ?? null;
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
  const db = await getDb();
  const rows = await db
    .select({
      ...userColumns,
      password_hash: users.password_hash,
    })
    .from(users)
    .where(eq(users.email, email.trim()))
    .limit(1);
  const row = rows[0];

  if (!row?.password_hash || !verifyPassword(password, row.password_hash)) {
    return { ok: false, error: "invalid" };
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  await db.insert(sessions).values({
    token,
    user_id: row.id,
    expires_at: expiresAt,
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });

  const { password_hash: _ph, ...user } = row;
  void _ph;
  return { ok: true, user: user as User };
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.delete(sessions).where(eq(sessions.token, token));
  }
  store.delete(SESSION_COOKIE);
}

export type CreateUserInput = {
  email: string;
  password: string;
  full_name?: string | null;
  company?: string | null;
  region?: string | null;
  regions?: string[] | null;
  rubriek?: string | null;
  rubrieken?: string[] | null;
  partner_type?: string | null;
  slug?: string | null;
  role?: Role;
};

function serializeArray(arr: string[] | null | undefined): string | null {
  if (!arr || arr.length === 0) return null;
  return JSON.stringify(arr.filter((s, i, all) => s && all.indexOf(s) === i));
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const db = await getDb();
  const id = randomUUID();
  await db.insert(users).values({
    id,
    email: input.email.trim(),
    password_hash: hashPassword(input.password),
    full_name: input.full_name?.trim() || null,
    company: input.company?.trim() || null,
    region: input.region?.trim() || null,
    regions: serializeArray(input.regions),
    rubriek: input.rubriek?.trim() || null,
    rubrieken: serializeArray(input.rubrieken),
    partner_type: input.partner_type?.trim() || null,
    slug: input.slug ? input.slug.trim().toLowerCase() || null : null,
    role: input.role ?? "partner",
  });

  const rows = await db
    .select(userColumns)
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return rows[0] as User;
}

export async function setUserRole(id: string, role: Role): Promise<void> {
  const db = await getDb();
  await db.update(users).set({ role }).where(eq(users.id, id));
}

export async function deleteUser(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(users).where(eq(users.id, id));
}
