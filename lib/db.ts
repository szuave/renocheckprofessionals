import "server-only";
import { eq } from "drizzle-orm";
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
  migrateLocalSchema(conn);

  cachedLocalDb = drizzle(conn, { schema });

  await seedAdminIfEmpty(cachedLocalDb);
  await seedDemoIfBare(cachedLocalDb);
  return cachedLocalDb;
}

function migrateLocalSchema(conn: import("better-sqlite3").Database) {
  // Idempotent column additions for existing local DBs.
  const userCols = new Set(
    (conn.prepare("PRAGMA table_info(users)").all() as { name: string }[]).map(
      (r) => r.name,
    ),
  );
  if (!userCols.has("regions"))
    conn.exec("ALTER TABLE users ADD COLUMN regions TEXT");
  if (!userCols.has("rubrieken"))
    conn.exec("ALTER TABLE users ADD COLUMN rubrieken TEXT");
  if (!userCols.has("slug"))
    conn.exec("ALTER TABLE users ADD COLUMN slug TEXT");

  const eventCols = new Set(
    (conn.prepare("PRAGMA table_info(events)").all() as { name: string }[]).map(
      (r) => r.name,
    ),
  );
  if (!eventCols.has("region"))
    conn.exec("ALTER TABLE events ADD COLUMN region TEXT");
  if (!eventCols.has("price_cents"))
    conn.exec("ALTER TABLE events ADD COLUMN price_cents TEXT");

  // Unique index on slug (after column exists) — partial unique to allow NULLs.
  conn.exec(
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_slug ON users(slug) WHERE slug IS NOT NULL",
  );
  // event_checkins table
  conn.exec(`
    CREATE TABLE IF NOT EXISTS event_checkins (
      event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      checked_in_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
      PRIMARY KEY (event_id, user_id)
    );
    CREATE INDEX IF NOT EXISTS idx_event_checkins_event ON event_checkins(event_id);
    CREATE INDEX IF NOT EXISTS idx_event_checkins_user ON event_checkins(user_id);
    CREATE INDEX IF NOT EXISTS idx_events_region ON events(region);
  `);
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
/*  Seed demo content if DB has admin only (no partners/posts/events)  */
/* ------------------------------------------------------------------ */

async function seedDemoIfBare(db: DB) {
  const { hashPassword } = await import("./passwords");
  const { randomUUID } = await import("node:crypto");

  // Bail out if there's already any non-admin user, blog post or event.
  const partners = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.role, "partner"))
    .limit(1);
  if (partners.length > 0) return;

  const posts = await db.select({ id: schema.blog_posts.id }).from(schema.blog_posts).limit(1);
  if (posts.length > 0) return;

  const evs = await db.select({ id: schema.events.id }).from(schema.events).limit(1);
  if (evs.length > 0) return;

  // We need an author for posts/events — pick the existing admin.
  const adminRow = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.role, "admin"))
    .limit(1);
  const adminId = adminRow[0]?.id;
  if (!adminId) return;

  const demoPassword = "demo123";
  const hash = hashPassword(demoPassword);

  // Demo partners — one per partner-type/region, slug set so /[slug] werkt.
  const demoPartners: Array<{
    id: string;
    email: string;
    full_name: string;
    company: string;
    partner_type: string;
    regions: string[];
    rubrieken: string[] | null;
    slug: string;
  }> = [
    {
      id: randomUUID(),
      email: "stef@atelier-vandevelde.be",
      full_name: "Stef Vandevelde",
      company: "Atelier Vandevelde",
      partner_type: "architect",
      regions: ["west-vlaanderen"],
      rubrieken: null,
      slug: "atelier-vandevelde",
    },
    {
      id: randomUUID(),
      email: "ann@bureau-driesen.be",
      full_name: "Ann Driesen",
      company: "Bureau Driesen Architecten",
      partner_type: "architect",
      regions: ["antwerpen"],
      rubrieken: null,
      slug: "bureau-driesen",
    },
    {
      id: randomUUID(),
      email: "jan@elektro-callens.be",
      full_name: "Jan Callens",
      company: "Elektro Callens",
      partner_type: "vakspecialist",
      regions: ["oost-vlaanderen", "west-vlaanderen"],
      rubrieken: ["Elektriciteit"],
      slug: "elektro-callens",
    },
    {
      id: randomUUID(),
      email: "tim@dakwerken-vermeulen.be",
      full_name: "Tim Vermeulen",
      company: "Dakwerken Vermeulen",
      partner_type: "vakspecialist",
      regions: ["vlaams-brabant"],
      rubrieken: ["Dakwerken", "Isolatie"],
      slug: "dakwerken-vermeulen",
    },
    {
      id: randomUUID(),
      email: "lieven@sanitair-mertens.be",
      full_name: "Lieven Mertens",
      company: "Mertens Sanitair & Verwarming",
      partner_type: "vakspecialist",
      regions: ["antwerpen"],
      rubrieken: ["Sanitair", "Verwarming & airco"],
      slug: "mertens-sanitair",
    },
    {
      id: randomUUID(),
      email: "katrien@bouwgroep-deroo.be",
      full_name: "Katrien De Roo",
      company: "Bouwgroep De Roo",
      partner_type: "bouwondernemer",
      regions: ["oost-vlaanderen"],
      rubrieken: null,
      slug: "bouwgroep-deroo",
    },
    {
      id: randomUUID(),
      email: "peter@schilderwerken-baert.be",
      full_name: "Peter Baert",
      company: "Schilderwerken Baert",
      partner_type: "vakspecialist",
      regions: ["west-vlaanderen"],
      rubrieken: ["Schilderwerken"],
      slug: "schilderwerken-baert",
    },
  ];

  for (const p of demoPartners) {
    await db.insert(schema.users).values({
      id: p.id,
      email: p.email,
      password_hash: hash,
      full_name: p.full_name,
      company: p.company,
      partner_type: p.partner_type,
      region: p.regions[0] ?? null,
      regions: JSON.stringify(p.regions),
      rubriek: p.rubrieken?.[0] ?? null,
      rubrieken: p.rubrieken ? JSON.stringify(p.rubrieken) : null,
      slug: p.slug,
      role: "partner",
    });
  }

  // Demo blog posts.
  const demoPosts: Array<{ title: string; excerpt: string; body: string; authorIdx: number; createdOffsetDays: number }> = [
    {
      title: "Welkom bij Renocheck Professionals",
      excerpt:
        "Het partnerportaal is live. Hier delen we mededelingen, agenda en samenwerkingen binnen het netwerk.",
      body: "Beste partner,\n\nVanaf vandaag vind je op dit portaal alle mededelingen, agenda-items en updates die we binnen het netwerk delen. Gebruik 'Blog & berichten' om zelf iets te delen met de andere partners — een werfverslag, een opendeur-uitnodiging of een waarschuwing over een materiaalwijziging.\n\nWelkom aan boord.\n\n— Maxime Vandenbroucke\nRenocheck Professionals",
      authorIdx: -1, // admin
      createdOffsetDays: 14,
    },
    {
      title: "Nieuw partner: Schilderwerken Baert (West-Vlaanderen)",
      excerpt:
        "Peter Baert vervoegt het netwerk voor de rubriek Schilderwerken in West-Vlaanderen.",
      body: "Vanaf deze maand is Schilderwerken Baert (Brugge) onze geselecteerde partner voor de rubriek Schilderwerken in West-Vlaanderen. Peter Baert is al meer dan vijftien jaar gespecialiseerd in restauratiewerk en hoogwaardige binnenafwerking.\n\nKom hem ontmoeten op het maandelijks partner-event in juni.",
      authorIdx: -1,
      createdOffsetDays: 8,
    },
    {
      title: "Werfverslag: zwarte hangende keuken op project Damme",
      excerpt:
        "Atelier Vandevelde deelt een korte recap van een verrassend project — een keuken die letterlijk los van de muur staat.",
      body: "Op een renovatie in Damme realiseerden we samen met Mertens Sanitair en Elektro Callens een hangende kookeiland-constructie van bijna 5 meter. De uitdaging zat in het verbergen van leidingen, dampkap-afvoer en bekabeling zonder een traditionele kookeilandpoot.\n\nResultaat: een keuken die zweeft. Foto's volgen op de eerstvolgende partner-borrel.\n\n— Stef\nAtelier Vandevelde",
      authorIdx: 0,
      createdOffsetDays: 5,
    },
    {
      title: "Heads-up: nieuwe EPB-eisen vanaf januari",
      excerpt:
        "Korte samenvatting van wat de strengere isolatie-eisen betekenen voor lopende dossiers.",
      body: "Vanaf 1 januari volgend jaar wijzigen de minimum-Umax-waarden voor daken en muren bij ingrijpende energetische renovaties. Voor lopende dossiers waarvan de bouwaanvraag nog niet definitief is, betekent dit mogelijk een aanpassing van de isolatieopbouw.\n\nWe organiseren in december een gezamenlijke partner-sessie met de EPB-verslaggever van het netwerk om concrete cases te bespreken. Inschrijven via de agenda.",
      authorIdx: -1,
      createdOffsetDays: 2,
    },
  ];

  for (const p of demoPosts) {
    const author_id =
      p.authorIdx === -1 ? adminId : demoPartners[p.authorIdx]?.id ?? adminId;
    const created = new Date(
      Date.now() - p.createdOffsetDays * 24 * 60 * 60 * 1000,
    ).toISOString();
    await db.insert(schema.blog_posts).values({
      id: randomUUID(),
      author_id,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      created_at: created,
      updated_at: created,
    });
  }

  // Demo events — spread across upcoming weeks/months.
  const upcoming: Array<{
    title: string;
    description: string;
    location: string;
    region: string | null;
    price_eur: number | null;
    offsetDays: number;
    hour: number;
  }> = [
    {
      title: "Partnerborrel · juni-editie",
      description:
        "Maandelijks netwerkmoment voor alle Renocheck partners. Korte presentatie van een nieuw partner, daarna borrel + bites.",
      location: "Atelier Vandevelde, Brugge",
      region: "west-vlaanderen",
      price_eur: null,
      offsetDays: 10,
      hour: 19,
    },
    {
      title: "Opendeur · Bureau Driesen",
      description:
        "Rondleiding doorheen het pas verbouwde architectenbureau, gevolgd door Q&A over werfopvolging in Antwerpen-centrum.",
      location: "Bureau Driesen, Antwerpen",
      region: "antwerpen",
      price_eur: 15,
      offsetDays: 24,
      hour: 17,
    },
    {
      title: "Werfbezoek · zero-energie woning Gent",
      description:
        "Bezoek met de hele projectploeg aan een zero-energie nieuwbouw kort voor oplevering. Beperkt aantal plaatsen.",
      location: "Sint-Amandsberg, Gent",
      region: "oost-vlaanderen",
      price_eur: null,
      offsetDays: 36,
      hour: 14,
    },
    {
      title: "Opleiding EPB-update januari",
      description:
        "Gezamenlijke partner-sessie met de EPB-verslaggever. Concrete cases uit het netwerk.",
      location: "Online + Leuven",
      region: "vlaams-brabant",
      price_eur: 40,
      offsetDays: 52,
      hour: 9,
    },
    {
      title: "Partnerborrel · juli-editie",
      description: "Zomereditie met BBQ in de tuin van Bouwgroep De Roo.",
      location: "Bouwgroep De Roo, Lokeren",
      region: "oost-vlaanderen",
      price_eur: 25,
      offsetDays: 70,
      hour: 18,
    },
  ];

  for (const e of upcoming) {
    const starts = new Date(Date.now() + e.offsetDays * 24 * 60 * 60 * 1000);
    starts.setHours(e.hour, 0, 0, 0);
    const ends = new Date(starts.getTime() + 3 * 60 * 60 * 1000);
    await db.insert(schema.events).values({
      id: randomUUID(),
      author_id: adminId,
      title: e.title,
      description: e.description,
      location: e.location,
      region: e.region,
      price_cents:
        e.price_eur != null ? String(Math.round(e.price_eur * 100)) : null,
      starts_at: starts.toISOString(),
      ends_at: ends.toISOString(),
    });
  }

  console.log(
    `\n[renocheck] Demo content gezaaid: ${demoPartners.length} partners, ${demoPosts.length} berichten, ${upcoming.length} events.\nPartner-login (voor test): elk demo-account, wachtwoord: ${demoPassword}\n`,
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
  regions TEXT,
  rubriek TEXT,
  rubrieken TEXT,
  partner_type TEXT,
  slug TEXT,
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
