import type { Metadata } from "next";
import Link from "next/link";
import { listUpcomingEvents } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Agenda",
  robots: { index: false, follow: false },
};

const REGION_OPTIONS = [
  { value: "", label: "Alle regio's" },
  { value: "west-vlaanderen", label: "West-Vlaanderen" },
  { value: "oost-vlaanderen", label: "Oost-Vlaanderen" },
  { value: "antwerpen", label: "Antwerpen" },
  { value: "vlaams-brabant", label: "Vlaams-Brabant" },
];

function formatRegion(slug: string | null): string {
  if (!slug) return "Alle regio's";
  return REGION_OPTIONS.find((r) => r.value === slug)?.label ?? slug;
}

function formatPrice(price_cents: string | null): string | null {
  if (!price_cents) return null;
  const n = Number(price_cents);
  if (!Number.isFinite(n)) return null;
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
  }).format(n / 100);
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", { day: "2-digit" });
}
function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", { month: "short" });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function formatWeekday(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", { weekday: "long" });
}

export default async function AgendaListPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const params = await searchParams;
  const activeRegion = params?.region ?? "";
  const events = await listUpcomingEvents();
  const filtered = activeRegion
    ? events.filter((e) => e.region === activeRegion)
    : events;

  // Group events by month
  const grouped = new Map<string, typeof filtered>();
  for (const e of filtered) {
    const key = new Date(e.starts_at).toLocaleDateString("nl-BE", {
      month: "long",
      year: "numeric",
    });
    const list = grouped.get(key) ?? [];
    list.push(e);
    grouped.set(key, list);
  }

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      {/* Header */}
      <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-sage/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
              Agenda
            </p>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] text-ink">
            Komende{" "}
            <span className="italic text-sage">events</span>.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-ink-soft md:text-[16px]">
            Partnerevents, opleidingen en opendeuren — filter op regio voor
            wat in uw kring speelt.
          </p>
        </div>

        <Link
          href="/dashboard/agenda/nieuw"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-sage"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 11h18" />
          </svg>
          Nieuw event
        </Link>
      </header>

      {/* Filters */}
      <nav
        aria-label="Filter op regio"
        className="mt-10 flex flex-wrap items-center gap-2 md:mt-12"
      >
        {REGION_OPTIONS.map((opt) => {
          const isActive = opt.value === activeRegion;
          const href = opt.value
            ? `/dashboard/agenda?region=${opt.value}`
            : "/dashboard/agenda";
          const count = opt.value
            ? events.filter((e) => e.region === opt.value).length
            : events.length;
          return (
            <Link
              key={opt.value}
              href={href}
              className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                isActive
                  ? "bg-ink text-white shadow-[0_1px_2px_rgba(15,23,20,0.18)]"
                  : "border border-ink-hair/70 bg-white/60 text-ink-soft hover:border-sage hover:text-ink"
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`rounded-full px-1.5 text-[10px] tabular-nums ${
                  isActive ? "bg-white/15 text-white" : "bg-ink/5 text-ink-muted"
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </nav>

      {filtered.length === 0 ? (
        <EmptyState filtered={activeRegion !== ""} />
      ) : (
        <div className="mt-12 space-y-12 md:mt-14">
          {Array.from(grouped.entries()).map(([monthLabel, items]) => (
            <section key={monthLabel}>
              <div className="flex items-baseline justify-between border-b border-ink-hair/40 pb-3">
                <h2 className="font-display text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
                  {monthLabel}
                </h2>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink-muted/70">
                  {items.length} event{items.length === 1 ? "" : "s"}
                </p>
              </div>

              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {items.map((e) => {
                  const price = formatPrice(e.price_cents);
                  return (
                    <li key={e.id}>
                      <Link
                        href={`/dashboard/agenda/${e.id}`}
                        className="group flex items-stretch gap-5 rounded-2xl border border-ink-hair/50 bg-white/70 p-5 transition-all hover:border-sage hover:bg-surface-soft/50 hover:shadow-[0_4px_18px_-8px_rgba(125,154,133,0.35)]"
                      >
                        <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-ink py-3 text-white">
                          <span className="font-display text-[28px] font-medium leading-none">
                            {formatDay(e.starts_at)}
                          </span>
                          <span className="mt-1.5 text-[9px] uppercase tracking-[0.18em] text-white/75">
                            {formatMonth(e.starts_at)}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-ink-muted">
                            {formatWeekday(e.starts_at)} · {formatTime(e.starts_at)}
                          </p>
                          <h3 className="mt-2 font-display text-[20px] font-medium leading-tight text-ink transition-colors group-hover:text-sage md:text-[22px]">
                            {e.title}
                          </h3>
                          {e.location ? (
                            <p className="mt-2 text-[13px] text-ink-soft">
                              {e.location}
                            </p>
                          ) : null}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {e.region ? (
                              <span className="inline-flex items-center rounded-full bg-sage/10 px-2.5 py-1 text-[11px] font-medium text-sage-dark">
                                {formatRegion(e.region)}
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                                Alle regio's
                              </span>
                            )}
                            <span className="inline-flex items-center rounded-full border border-ink-hair/70 bg-white px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                              {price ? `${price} p/p` : "Gratis"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </article>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-ink-hair/70 p-10 text-center md:mt-14 md:p-16">
      <span
        aria-hidden="true"
        className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 11h18" />
        </svg>
      </span>
      <p className="mt-6 font-display text-[28px] font-medium leading-[1.2] text-ink md:text-[34px]">
        {filtered ? "Geen events in deze regio." : "Nog geen events."}
      </p>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-ink-soft">
        {filtered
          ? "Kies een andere regio of toon alle events."
          : "Voeg een opendeur, vergadering of opleiding toe via de knop hierboven."}
      </p>
      {!filtered ? (
        <Link
          href="/dashboard/agenda/nieuw"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white hover:bg-sage"
        >
          Event toevoegen →
        </Link>
      ) : null}
    </div>
  );
}
