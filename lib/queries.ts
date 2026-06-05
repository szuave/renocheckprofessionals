import "server-only";
import { randomUUID } from "node:crypto";
import { and, desc, eq, gte, sql as drizzleSql } from "drizzle-orm";
import { getDb, schema } from "./db";
import type { BlogPost, EventRow, User } from "./types";

const {
  users,
  blog_posts,
  events,
  event_checkins,
  partner_applications,
  leads,
  contact_messages,
} = schema;

// Helpers for JSON-array text columns (multi-region, multi-rubriek).
function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const arr = JSON.parse(value);
    return Array.isArray(arr) ? arr.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

function serializeJsonArray(arr: string[] | null | undefined): string | null {
  if (!arr || arr.length === 0) return null;
  return JSON.stringify(arr.filter((s, i, all) => s && all.indexOf(s) === i));
}

export const parseRegions = parseJsonArray;
export const serializeRegions = serializeJsonArray;
export const parseRubrieken = parseJsonArray;
export const serializeRubrieken = serializeJsonArray;

export type AuthorRef = Pick<User, "full_name" | "company">;
export type BlogPostWithAuthor = BlogPost & { author: AuthorRef | null };
export type EventWithAuthor = EventRow & { author: AuthorRef | null };

const blogJoinColumns = {
  id: blog_posts.id,
  author_id: blog_posts.author_id,
  title: blog_posts.title,
  excerpt: blog_posts.excerpt,
  body: blog_posts.body,
  created_at: blog_posts.created_at,
  updated_at: blog_posts.updated_at,
  author_full_name: users.full_name,
  author_company: users.company,
};

const eventJoinColumns = {
  id: events.id,
  author_id: events.author_id,
  title: events.title,
  description: events.description,
  location: events.location,
  region: events.region,
  price_cents: events.price_cents,
  starts_at: events.starts_at,
  ends_at: events.ends_at,
  created_at: events.created_at,
  author_full_name: users.full_name,
  author_company: users.company,
};

function shapeBlog(r: {
  id: string;
  author_id: string;
  title: string;
  excerpt: string | null;
  body: string;
  created_at: string;
  updated_at: string;
  author_full_name: string | null;
  author_company: string | null;
}): BlogPostWithAuthor {
  return {
    id: r.id,
    author_id: r.author_id,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body,
    created_at: r.created_at,
    updated_at: r.updated_at,
    author:
      r.author_full_name || r.author_company
        ? { full_name: r.author_full_name, company: r.author_company }
        : null,
  };
}

function shapeEvent(r: {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  location: string | null;
  region: string | null;
  price_cents: string | null;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
  author_full_name: string | null;
  author_company: string | null;
}): EventWithAuthor {
  return {
    id: r.id,
    author_id: r.author_id,
    title: r.title,
    description: r.description,
    location: r.location,
    region: r.region,
    price_cents: r.price_cents,
    starts_at: r.starts_at,
    ends_at: r.ends_at,
    created_at: r.created_at,
    author:
      r.author_full_name || r.author_company
        ? { full_name: r.author_full_name, company: r.author_company }
        : null,
  };
}

/* -------------------- Blog -------------------- */

export async function listBlogPosts(): Promise<BlogPostWithAuthor[]> {
  const db = await getDb();
  const rows = await db
    .select(blogJoinColumns)
    .from(blog_posts)
    .leftJoin(users, eq(users.id, blog_posts.author_id))
    .orderBy(desc(blog_posts.created_at));
  return rows.map(shapeBlog);
}

export async function getBlogPost(
  id: string,
): Promise<BlogPostWithAuthor | null> {
  const db = await getDb();
  const rows = await db
    .select(blogJoinColumns)
    .from(blog_posts)
    .leftJoin(users, eq(users.id, blog_posts.author_id))
    .where(eq(blog_posts.id, id))
    .limit(1);
  return rows[0] ? shapeBlog(rows[0]) : null;
}

export async function createBlogPost(input: {
  author_id: string;
  title: string;
  excerpt: string | null;
  body: string;
}): Promise<string> {
  const db = await getDb();
  const id = randomUUID();
  await db.insert(blog_posts).values({
    id,
    author_id: input.author_id,
    title: input.title,
    excerpt: input.excerpt,
    body: input.body,
  });
  return id;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(blog_posts).where(eq(blog_posts.id, id));
}

/* -------------------- Events -------------------- */

export async function listUpcomingEvents(): Promise<EventWithAuthor[]> {
  const db = await getDb();
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const rows = await db
    .select(eventJoinColumns)
    .from(events)
    .leftJoin(users, eq(users.id, events.author_id))
    .where(gte(events.starts_at, cutoff))
    .orderBy(events.starts_at);
  return rows.map(shapeEvent);
}

export async function getEvent(id: string): Promise<EventWithAuthor | null> {
  const db = await getDb();
  const rows = await db
    .select(eventJoinColumns)
    .from(events)
    .leftJoin(users, eq(users.id, events.author_id))
    .where(eq(events.id, id))
    .limit(1);
  return rows[0] ? shapeEvent(rows[0]) : null;
}

export async function createEvent(input: {
  author_id: string;
  title: string;
  description: string | null;
  location: string | null;
  region: string | null;
  price_cents: number | null;
  starts_at: string;
  ends_at: string | null;
}): Promise<string> {
  const db = await getDb();
  const id = randomUUID();
  await db.insert(events).values({
    id,
    author_id: input.author_id,
    title: input.title,
    description: input.description,
    location: input.location,
    region: input.region,
    price_cents: input.price_cents != null ? String(input.price_cents) : null,
    starts_at: input.starts_at,
    ends_at: input.ends_at,
  });
  return id;
}

export async function updateEvent(
  id: string,
  patch: Partial<{
    title: string;
    description: string | null;
    location: string | null;
    region: string | null;
    price_cents: number | null;
    starts_at: string;
    ends_at: string | null;
  }>,
): Promise<void> {
  const db = await getDb();
  const values: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    if (k === "price_cents") {
      values.price_cents = v != null ? String(v) : null;
    } else {
      values[k] = v;
    }
  }
  if (Object.keys(values).length === 0) return;
  await db.update(events).set(values).where(eq(events.id, id));
}

export async function deleteEvent(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(events).where(eq(events.id, id));
}

/* -------------------- Event checkins -------------------- */

export type EventCheckin = {
  event_id: string;
  user_id: string;
  checked_in_at: string;
  user_name: string | null;
  user_company: string | null;
  user_email: string;
};

export async function checkInToEvent(
  event_id: string,
  user_id: string,
): Promise<void> {
  const db = await getDb();
  // Idempotent — duplicate check-in same (event,user) is a no-op via primary key.
  try {
    await db
      .insert(event_checkins)
      .values({ event_id, user_id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (!msg.includes("UNIQUE") && !msg.includes("PRIMARY")) throw e;
  }
}

export async function checkOutFromEvent(
  event_id: string,
  user_id: string,
): Promise<void> {
  const db = await getDb();
  await db
    .delete(event_checkins)
    .where(
      and(eq(event_checkins.event_id, event_id), eq(event_checkins.user_id, user_id)),
    );
}

export async function isUserCheckedIn(
  event_id: string,
  user_id: string,
): Promise<boolean> {
  const db = await getDb();
  const rows = await db
    .select({ event_id: event_checkins.event_id })
    .from(event_checkins)
    .where(
      and(eq(event_checkins.event_id, event_id), eq(event_checkins.user_id, user_id)),
    )
    .limit(1);
  return rows.length > 0;
}

export async function listEventCheckins(event_id: string): Promise<EventCheckin[]> {
  const db = await getDb();
  const rows = await db
    .select({
      event_id: event_checkins.event_id,
      user_id: event_checkins.user_id,
      checked_in_at: event_checkins.checked_in_at,
      user_name: users.full_name,
      user_company: users.company,
      user_email: users.email,
    })
    .from(event_checkins)
    .innerJoin(users, eq(users.id, event_checkins.user_id))
    .where(eq(event_checkins.event_id, event_id))
    .orderBy(desc(event_checkins.checked_in_at));
  return rows as EventCheckin[];
}

export async function listUserCheckins(user_id: string): Promise<string[]> {
  const db = await getDb();
  const rows = await db
    .select({ event_id: event_checkins.event_id })
    .from(event_checkins)
    .where(eq(event_checkins.user_id, user_id));
  return rows.map((r) => r.event_id);
}

/* -------------------- Users (list) -------------------- */

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

export async function listUsers(): Promise<User[]> {
  const db = await getDb();
  const rows = await db
    .select(userColumns)
    .from(users)
    .orderBy(desc(users.created_at));
  return rows as User[];
}

export async function listUsersByName(): Promise<User[]> {
  const db = await getDb();
  const rows = await db
    .select(userColumns)
    .from(users)
    .orderBy(drizzleSql`COALESCE(${users.full_name}, ${users.company}, ${users.email}) ASC`);
  return rows as User[];
}

export async function getUserById(id: string): Promise<User | null> {
  const db = await getDb();
  const rows = await db
    .select(userColumns)
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return (rows[0] as User | undefined) ?? null;
}

export async function getUserBySlug(slug: string): Promise<User | null> {
  const db = await getDb();
  const rows = await db
    .select(userColumns)
    .from(users)
    .where(eq(users.slug, slug.toLowerCase()))
    .limit(1);
  return (rows[0] as User | undefined) ?? null;
}

export async function updateUserProfile(
  id: string,
  patch: Partial<{
    full_name: string | null;
    company: string | null;
    region: string | null;
    regions: string[] | null;
    rubriek: string | null;
    rubrieken: string[] | null;
    partner_type: string | null;
    slug: string | null;
  }>,
): Promise<void> {
  const db = await getDb();
  const values: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    if (k === "regions") {
      values.regions = serializeRegions(v as string[] | null);
    } else if (k === "rubrieken") {
      values.rubrieken = serializeRubrieken(v as string[] | null);
    } else if (k === "slug") {
      values.slug = v ? String(v).trim().toLowerCase() : null;
    } else {
      values[k] = v;
    }
  }
  if (Object.keys(values).length === 0) return;
  await db.update(users).set(values).where(eq(users.id, id));
}

/* -------------------- Partner applications -------------------- */

export type PartnerApplication = typeof partner_applications.$inferSelect;

export async function createPartnerApplication(input: {
  company: string;
  contact_name: string | null;
  email: string;
  phone: string | null;
  partner_type: string | null;
  region: string | null;
  rubriek: string | null;
  message: string | null;
}): Promise<string> {
  const db = await getDb();
  const id = randomUUID();
  await db.insert(partner_applications).values({ id, ...input });
  return id;
}

export async function listPartnerApplications(): Promise<PartnerApplication[]> {
  const db = await getDb();
  return db
    .select()
    .from(partner_applications)
    .orderBy(desc(partner_applications.created_at));
}

export async function setApplicationStatus(
  id: string,
  status: PartnerApplication["status"],
): Promise<void> {
  const db = await getDb();
  await db
    .update(partner_applications)
    .set({ status })
    .where(eq(partner_applications.id, id));
}

export async function deletePartnerApplication(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(partner_applications).where(eq(partner_applications.id, id));
}

/* -------------------- Leads -------------------- */

export type Lead = typeof leads.$inferSelect;

export async function createLead(input: {
  first_name: string | null;
  last_name: string | null;
  email: string;
  region: string | null;
  source: string;
}): Promise<string> {
  const db = await getDb();
  const id = randomUUID();
  await db.insert(leads).values({ id, ...input });
  return id;
}

export async function listLeads(): Promise<Lead[]> {
  const db = await getDb();
  return db.select().from(leads).orderBy(desc(leads.created_at));
}

export async function deleteLead(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(leads).where(eq(leads.id, id));
}

/* -------------------- Contact messages -------------------- */

export type ContactMessage = typeof contact_messages.$inferSelect;

export async function createContactMessage(input: {
  subject_type: ContactMessage["subject_type"];
  first_name: string;
  last_name: string | null;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
}): Promise<string> {
  const db = await getDb();
  const id = randomUUID();
  await db.insert(contact_messages).values({ id, ...input });
  return id;
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  const db = await getDb();
  return db
    .select()
    .from(contact_messages)
    .orderBy(desc(contact_messages.created_at));
}

export async function setContactMessageStatus(
  id: string,
  status: ContactMessage["status"],
): Promise<void> {
  const db = await getDb();
  await db
    .update(contact_messages)
    .set({ status })
    .where(eq(contact_messages.id, id));
}

export async function deleteContactMessage(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(contact_messages).where(eq(contact_messages.id, id));
}

// Suppress unused-import warning for `and` (may be needed later).
void and;
