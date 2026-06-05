import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import {
  listBlogPosts,
  listUpcomingEvents,
  listUsers,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Startpagina",
  robots: { index: false, follow: false },
};

const QUICK_ACTIONS = [
  {
    href: "/dashboard/blog/nieuw",
    label: "Nieuw bericht",
    icon: (
      <path d="M5 12h14M12 5v14" />
    ),
  },
  {
    href: "/dashboard/agenda/nieuw",
    label: "Event toevoegen",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 11h18" />
      </>
    ),
  },
  {
    href: "/dashboard/leden",
    label: "Ledenlijst openen",
    icon: (
      <>
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="11" r="2.5" />
        <path d="M3 19c1.5-3 4-4.5 6-4.5s4.5 1.5 6 4.5M15 19c.7-1.6 2-2.5 3-2.5s2.3.9 3 2.5" />
      </>
    ),
  },
];

const REGION_LABEL: Record<string, string> = {
  "west-vlaanderen": "West-Vlaanderen",
  "oost-vlaanderen": "Oost-Vlaanderen",
  antwerpen: "Antwerpen",
  "vlaams-brabant": "Vlaams-Brabant",
};

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", { day: "2-digit" });
}
function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", { month: "short" });
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function DashboardPage() {
  const user = await requireUser();
  const greetingName =
    user.full_name?.split(" ")[0] ?? user.email.split("@")[0] ?? "partner";

  const [posts, events, partners] = await Promise.all([
    listBlogPosts(),
    listUpcomingEvents(),
    listUsers(),
  ]);

  const today = new Date().toLocaleDateString("nl-BE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const recentPosts = posts.slice(0, 4);
  const upcomingEvents = events.slice(0, 4);
  const partnerCount = partners.filter((p) => p.role !== "admin").length;

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      {/* ─────────── Hero ─────────── */}
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
            {today}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-medium leading-[1.02] text-ink">
            Hallo,{" "}
            <span className="italic text-sage">{greetingName}</span>.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-ink-soft md:text-[17px]">
            Een overzicht van wat er speelt in het netwerk. Snelle acties
            rechtsboven, recente activiteit hieronder.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-hair/70 bg-white/70 px-4 py-2.5 text-[13px] font-medium text-ink transition-all hover:border-sage hover:bg-sage/5 hover:text-sage-dark"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center text-ink-muted transition-colors group-hover:text-sage"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  {a.icon}
                </svg>
              </span>
              {a.label}
            </Link>
          ))}
        </div>
      </header>

      {/* ─────────── Stats ─────────── */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-16">
        <Stat
          label="Berichten"
          value={posts.length}
          sub={
            recentPosts[0]
              ? `Laatste: ${formatDate(recentPosts[0].created_at)}`
              : "Nog niets geschreven"
          }
          href="/dashboard/blog"
        />
        <Stat
          label="Aankomende events"
          value={events.length}
          sub={
            upcomingEvents[0]
              ? `Eerstvolgende: ${formatDate(upcomingEvents[0].starts_at)}`
              : "Geen geplande events"
          }
          href="/dashboard/agenda"
          accent
        />
        <Stat
          label="Andere partners"
          value={partnerCount}
          sub={`In het Vlaams netwerk`}
          href="/dashboard/leden"
        />
      </div>

      {/* ─────────── Recent activity ─────────── */}
      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Recente berichten */}
        <section className="lg:col-span-7">
          <PanelHeader
            label="Recente berichten"
            href="/dashboard/blog"
            ctaLabel="Naar blog"
          />
          {recentPosts.length === 0 ? (
            <EmptyPanel
              title="Nog geen berichten."
              hint="Schrijf het eerste netwerkbericht — partners zien het direct."
              ctaHref="/dashboard/blog/nieuw"
              ctaLabel="Bericht schrijven"
            />
          ) : (
            <ul className="mt-5 divide-y divide-ink-hair/40 rounded-3xl border border-ink-hair/50 bg-white/70">
              {recentPosts.map((p) => {
                const authorName =
                  p.author?.full_name ?? p.author?.company ?? "Renocheck partner";
                return (
                  <li key={p.id}>
                    <Link
                      href={`/dashboard/blog/${p.id}`}
                      className="group flex items-start gap-5 p-5 transition-colors hover:bg-surface-soft/60"
                    >
                      <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-sage" />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[18px] font-medium leading-tight text-ink transition-colors group-hover:text-sage md:text-[20px]">
                          {p.title}
                        </p>
                        <p className="mt-1.5 text-[12px] text-ink-muted">
                          {formatDate(p.created_at)} · {authorName}
                        </p>
                        {p.excerpt ? (
                          <p className="mt-2 line-clamp-1 text-[13px] leading-[1.55] text-ink-soft">
                            {p.excerpt}
                          </p>
                        ) : null}
                      </div>
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-ink-muted transition-colors group-hover:text-sage"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Aankomende events */}
        <section className="lg:col-span-5">
          <PanelHeader
            label="Aankomende events"
            href="/dashboard/agenda"
            ctaLabel="Naar agenda"
          />
          {upcomingEvents.length === 0 ? (
            <EmptyPanel
              title="Geen geplande events."
              hint="Voeg een opendeur, opleiding of partnervergadering toe."
              ctaHref="/dashboard/agenda/nieuw"
              ctaLabel="Event toevoegen"
            />
          ) : (
            <ul className="mt-5 space-y-3">
              {upcomingEvents.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/dashboard/agenda/${e.id}`}
                    className="group flex items-stretch gap-4 rounded-2xl border border-ink-hair/50 bg-white/70 p-4 transition-all hover:border-sage hover:bg-surface-soft/60"
                  >
                    <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-ink py-2 text-white">
                      <span className="font-display text-[22px] font-medium leading-none">
                        {formatDay(e.starts_at)}
                      </span>
                      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/75">
                        {formatMonth(e.starts_at)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[16px] font-medium leading-tight text-ink transition-colors group-hover:text-sage md:text-[17px]">
                        {e.title}
                      </p>
                      <p className="mt-1.5 text-[12px] text-ink-muted">
                        {[
                          e.region ? REGION_LABEL[e.region] ?? e.region : null,
                          e.location,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "Locatie volgt"}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ─────────── Support footer ─────────── */}
      <section className="mt-16 rounded-3xl border border-ink-hair/40 bg-gradient-to-br from-white via-surface-soft/30 to-sage/5 p-6 md:mt-20 md:p-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink-muted">
              Hulp nodig?
            </p>
            <p className="mt-2 text-[14px] leading-[1.6] text-ink md:text-[15px]">
              Het team is bereikbaar op{" "}
              <a
                href="mailto:info@renocheck.be"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                info@renocheck.be
              </a>{" "}
              of via{" "}
              <a
                href="tel:+3231234567"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                +32 (0)3 123 45 67
              </a>
              .
            </p>
          </div>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-ink-hair/70 bg-white/80 px-4 py-2 text-[13px] font-medium text-ink hover:border-sage hover:text-sage-dark"
          >
            Bekijk FAQ →
          </Link>
        </div>
      </section>
    </article>
  );
}

function Stat({
  label,
  value,
  sub,
  href,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between rounded-3xl border p-6 transition-all ${
        accent
          ? "border-sage/40 bg-gradient-to-br from-sage/10 via-white to-white hover:border-sage hover:from-sage/15"
          : "border-ink-hair/50 bg-white/70 hover:border-sage/60 hover:bg-surface-soft/60"
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink-muted">
        {label}
      </p>
      <p className="mt-6 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-none text-ink">
        {value}
      </p>
      <p className="mt-3 text-[12px] leading-[1.5] text-ink-muted transition-colors group-hover:text-sage">
        {sub}
      </p>
    </Link>
  );
}

function PanelHeader({
  label,
  href,
  ctaLabel,
}: {
  label: string;
  href: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-6 bg-sage/70" />
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
          {label}
        </h2>
      </div>
      <Link
        href={href}
        className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-soft hover:text-sage"
      >
        {ctaLabel} →
      </Link>
    </div>
  );
}

function EmptyPanel({
  title,
  hint,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  hint: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="mt-5 rounded-3xl border border-dashed border-ink-hair/70 p-7">
      <p className="font-display text-[20px] font-medium leading-tight text-ink">
        {title}
      </p>
      <p className="mt-2 text-[13px] leading-[1.6] text-ink-soft">{hint}</p>
      <Link
        href={ctaHref}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-white hover:bg-sage"
      >
        {ctaLabel} →
      </Link>
    </div>
  );
}
