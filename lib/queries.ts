import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "./db";
import type { BlogPost, EventRow, User } from "./types";

export type AuthorRef = Pick<User, "full_name" | "company">;

export type BlogPostWithAuthor = BlogPost & { author: AuthorRef | null };
export type EventWithAuthor = EventRow & { author: AuthorRef | null };

const BLOG_COLS =
  "p.id, p.author_id, p.title, p.excerpt, p.body, p.created_at, p.updated_at, u.full_name AS author_full_name, u.company AS author_company";

const EVENT_COLS =
  "e.id, e.author_id, e.title, e.description, e.location, e.starts_at, e.ends_at, e.created_at, u.full_name AS author_full_name, u.company AS author_company";

type BlogJoinRow = BlogPost & {
  author_full_name: string | null;
  author_company: string | null;
};

type EventJoinRow = EventRow & {
  author_full_name: string | null;
  author_company: string | null;
};

function blogFromRow(r: BlogJoinRow): BlogPostWithAuthor {
  return {
    id: r.id,
    author_id: r.author_id,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body,
    created_at: r.created_at,
    updated_at: r.updated_at,
    author: r.author_full_name || r.author_company
      ? { full_name: r.author_full_name, company: r.author_company }
      : null,
  };
}

function eventFromRow(r: EventJoinRow): EventWithAuthor {
  return {
    id: r.id,
    author_id: r.author_id,
    title: r.title,
    description: r.description,
    location: r.location,
    starts_at: r.starts_at,
    ends_at: r.ends_at,
    created_at: r.created_at,
    author: r.author_full_name || r.author_company
      ? { full_name: r.author_full_name, company: r.author_company }
      : null,
  };
}

export function listBlogPosts(): BlogPostWithAuthor[] {
  const rows = db
    .prepare(
      `SELECT ${BLOG_COLS} FROM blog_posts p
       LEFT JOIN users u ON u.id = p.author_id
       ORDER BY p.created_at DESC`,
    )
    .all() as BlogJoinRow[];
  return rows.map(blogFromRow);
}

export function getBlogPost(id: string): BlogPostWithAuthor | null {
  const row = db
    .prepare(
      `SELECT ${BLOG_COLS} FROM blog_posts p
       LEFT JOIN users u ON u.id = p.author_id
       WHERE p.id = ?`,
    )
    .get(id) as BlogJoinRow | undefined;
  return row ? blogFromRow(row) : null;
}

export function createBlogPost(input: {
  author_id: string;
  title: string;
  excerpt: string | null;
  body: string;
}): string {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO blog_posts (id, author_id, title, excerpt, body)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(id, input.author_id, input.title, input.excerpt, input.body);
  return id;
}

export function deleteBlogPost(id: string): void {
  db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
}

export function listUpcomingEvents(): EventWithAuthor[] {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const rows = db
    .prepare(
      `SELECT ${EVENT_COLS} FROM events e
       LEFT JOIN users u ON u.id = e.author_id
       WHERE e.starts_at >= ?
       ORDER BY e.starts_at ASC`,
    )
    .all(cutoff) as EventJoinRow[];
  return rows.map(eventFromRow);
}

export function getEvent(id: string): EventWithAuthor | null {
  const row = db
    .prepare(
      `SELECT ${EVENT_COLS} FROM events e
       LEFT JOIN users u ON u.id = e.author_id
       WHERE e.id = ?`,
    )
    .get(id) as EventJoinRow | undefined;
  return row ? eventFromRow(row) : null;
}

export function createEvent(input: {
  author_id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
}): string {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO events (id, author_id, title, description, location, starts_at, ends_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.author_id,
    input.title,
    input.description,
    input.location,
    input.starts_at,
    input.ends_at,
  );
  return id;
}

export function deleteEvent(id: string): void {
  db.prepare("DELETE FROM events WHERE id = ?").run(id);
}

export function listUsers(): User[] {
  return db
    .prepare(
      `SELECT id, email, full_name, company, region, rubriek, partner_type, role, created_at
       FROM users
       ORDER BY created_at DESC`,
    )
    .all() as User[];
}

export function listUsersByName(): User[] {
  return db
    .prepare(
      `SELECT id, email, full_name, company, region, rubriek, partner_type, role, created_at
       FROM users
       ORDER BY COALESCE(full_name, company, email) ASC`,
    )
    .all() as User[];
}

export type PartnerApplication = {
  id: string;
  company: string;
  contact_name: string | null;
  email: string;
  phone: string | null;
  partner_type: string | null;
  region: string | null;
  rubriek: string | null;
  message: string | null;
  status: "new" | "contacted" | "accepted" | "declined";
  created_at: string;
};

export function createPartnerApplication(input: {
  company: string;
  contact_name: string | null;
  email: string;
  phone: string | null;
  partner_type: string | null;
  region: string | null;
  rubriek: string | null;
  message: string | null;
}): string {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO partner_applications
       (id, company, contact_name, email, phone, partner_type, region, rubriek, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.company,
    input.contact_name,
    input.email,
    input.phone,
    input.partner_type,
    input.region,
    input.rubriek,
    input.message,
  );
  return id;
}

export function listPartnerApplications(): PartnerApplication[] {
  return db
    .prepare(
      `SELECT id, company, contact_name, email, phone, partner_type, region, rubriek, message, status, created_at
       FROM partner_applications
       ORDER BY created_at DESC`,
    )
    .all() as PartnerApplication[];
}

export function setApplicationStatus(
  id: string,
  status: PartnerApplication["status"],
): void {
  db.prepare("UPDATE partner_applications SET status = ? WHERE id = ?").run(
    status,
    id,
  );
}

export function deletePartnerApplication(id: string): void {
  db.prepare("DELETE FROM partner_applications WHERE id = ?").run(id);
}

export type Lead = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  region: string | null;
  source: string;
  created_at: string;
};

export function createLead(input: {
  first_name: string | null;
  last_name: string | null;
  email: string;
  region: string | null;
  source: string;
}): string {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO leads (id, first_name, last_name, email, region, source)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.first_name,
    input.last_name,
    input.email,
    input.region,
    input.source,
  );
  return id;
}

export function listLeads(): Lead[] {
  return db
    .prepare(
      `SELECT id, first_name, last_name, email, region, source, created_at
       FROM leads
       ORDER BY created_at DESC`,
    )
    .all() as Lead[];
}

export function deleteLead(id: string): void {
  db.prepare("DELETE FROM leads WHERE id = ?").run(id);
}

export type ContactMessage = {
  id: string;
  subject_type: "membership" | "videocall" | "question" | "other";
  first_name: string;
  last_name: string | null;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "read" | "closed";
  created_at: string;
};

export function createContactMessage(input: {
  subject_type: ContactMessage["subject_type"];
  first_name: string;
  last_name: string | null;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
}): string {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO contact_messages
       (id, subject_type, first_name, last_name, company, email, phone, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    input.subject_type,
    input.first_name,
    input.last_name,
    input.company,
    input.email,
    input.phone,
    input.message,
  );
  return id;
}

export function listContactMessages(): ContactMessage[] {
  return db
    .prepare(
      `SELECT id, subject_type, first_name, last_name, company, email, phone, message, status, created_at
       FROM contact_messages
       ORDER BY created_at DESC`,
    )
    .all() as ContactMessage[];
}

export function setContactMessageStatus(
  id: string,
  status: ContactMessage["status"],
): void {
  db.prepare("UPDATE contact_messages SET status = ? WHERE id = ?").run(
    status,
    id,
  );
}

export function deleteContactMessage(id: string): void {
  db.prepare("DELETE FROM contact_messages WHERE id = ?").run(id);
}
