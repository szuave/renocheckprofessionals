import { sql } from "drizzle-orm";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

const now = sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`;

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  full_name: text("full_name"),
  company: text("company"),
  region: text("region"),
  // JSON-encoded array of region slugs. Multi-region support — een vakspecialist
  // kan in meerdere regio's actief zijn.
  regions: text("regions"),
  rubriek: text("rubriek"),
  // JSON-encoded array of rubriek-namen. Multi-rubriek support — sommige
  // vakspecialisten zijn in meerdere rubrieken actief.
  rubrieken: text("rubrieken"),
  partner_type: text("partner_type"),
  slug: text("slug").unique(),
  role: text("role", { enum: ["admin", "partner"] }).notNull().default("partner"),
  created_at: text("created_at").notNull().default(now),
});

export const sessions = sqliteTable(
  "sessions",
  {
    token: text("token").primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires_at: text("expires_at").notNull(),
    created_at: text("created_at").notNull().default(now),
  },
  (t) => [index("idx_sessions_user_id").on(t.user_id)],
);

export const blog_posts = sqliteTable(
  "blog_posts",
  {
    id: text("id").primaryKey(),
    author_id: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    body: text("body").notNull(),
    created_at: text("created_at").notNull().default(now),
    updated_at: text("updated_at").notNull().default(now),
  },
  (t) => [index("idx_blog_posts_created_at").on(t.created_at)],
);

export const events = sqliteTable(
  "events",
  {
    id: text("id").primaryKey(),
    author_id: text("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    location: text("location"),
    region: text("region"),
    // Stored in cents to avoid float arithmetic. Null = niet gecommuniceerd / gratis.
    price_cents: text("price_cents"),
    starts_at: text("starts_at").notNull(),
    ends_at: text("ends_at"),
    created_at: text("created_at").notNull().default(now),
  },
  (t) => [
    index("idx_events_starts_at").on(t.starts_at),
    index("idx_events_region").on(t.region),
  ],
);

export const event_checkins = sqliteTable(
  "event_checkins",
  {
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    checked_in_at: text("checked_in_at").notNull().default(now),
  },
  (t) => [
    index("idx_event_checkins_event").on(t.event_id),
    index("idx_event_checkins_user").on(t.user_id),
  ],
);

export const partner_applications = sqliteTable(
  "partner_applications",
  {
    id: text("id").primaryKey(),
    company: text("company").notNull(),
    contact_name: text("contact_name"),
    email: text("email").notNull(),
    phone: text("phone"),
    partner_type: text("partner_type"),
    region: text("region"),
    rubriek: text("rubriek"),
    message: text("message"),
    status: text("status", {
      enum: ["new", "contacted", "accepted", "declined"],
    })
      .notNull()
      .default("new"),
    created_at: text("created_at").notNull().default(now),
  },
  (t) => [index("idx_partner_applications_created_at").on(t.created_at)],
);

export const leads = sqliteTable(
  "leads",
  {
    id: text("id").primaryKey(),
    first_name: text("first_name"),
    last_name: text("last_name"),
    email: text("email").notNull(),
    region: text("region"),
    source: text("source").notNull(),
    created_at: text("created_at").notNull().default(now),
  },
  (t) => [index("idx_leads_created_at").on(t.created_at)],
);

export const contact_messages = sqliteTable(
  "contact_messages",
  {
    id: text("id").primaryKey(),
    subject_type: text("subject_type", {
      enum: ["membership", "videocall", "question", "other"],
    }).notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name"),
    company: text("company"),
    email: text("email").notNull(),
    phone: text("phone"),
    message: text("message").notNull(),
    status: text("status", { enum: ["new", "read", "closed"] })
      .notNull()
      .default("new"),
    created_at: text("created_at").notNull().default(now),
  },
  (t) => [index("idx_contact_messages_created_at").on(t.created_at)],
);
