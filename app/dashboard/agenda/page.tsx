import type { Metadata } from "next";
import Link from "next/link";
import { listUpcomingEvents } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Agenda",
  robots: { index: false, follow: false },
};

export default async function AgendaListPage() {
  const events = listUpcomingEvents();

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            Agenda
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
            Komende{" "}
            <span className="italic text-sage">events</span>.
          </h1>
        </div>
        <Link
          href="/dashboard/agenda/nieuw"
          className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-sage"
        >
          + Nieuw event toevoegen
        </Link>
      </header>

      {events.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="mt-12 divide-y divide-ink-hair/50 border-y border-ink-hair/50 md:mt-16">
          {events.map((e) => (
            <li key={e.id}>
              <Link
                href={`/dashboard/agenda/${e.id}`}
                className="group grid gap-4 py-7 transition-colors hover:bg-surface-soft/40 md:grid-cols-12 md:items-center md:gap-8 md:py-9"
              >
                <div className="md:col-span-3">
                  <p className="font-display text-[28px] font-medium leading-none text-ink md:text-[32px]">
                    {formatDay(e.starts_at)}
                  </p>
                  <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
                    {formatMonth(e.starts_at)} · {formatTime(e.starts_at)}
                  </p>
                </div>
                <div className="min-w-0 md:col-span-7">
                  <h2 className="font-display text-[24px] font-medium leading-[1.2] text-ink transition-colors group-hover:text-sage md:text-[28px]">
                    {e.title}
                  </h2>
                  {e.location ? (
                    <p className="mt-2 text-[14px] text-ink-muted">
                      {e.location}
                    </p>
                  ) : null}
                  {e.description ? (
                    <p className="mt-2 line-clamp-2 text-[15px] leading-[1.6] text-ink-soft">
                      {e.description}
                    </p>
                  ) : null}
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span className="text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
                    Bekijken →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-ink-hair p-10 text-center md:mt-16 md:p-16">
      <p className="font-display text-[28px] font-medium leading-[1.2] text-ink md:text-[34px]">
        Nog geen events.
      </p>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-ink-soft">
        Voeg een opendeur, vergadering of opleiding toe via de knop
        hierboven.
      </p>
    </div>
  );
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", { day: "2-digit" });
}
function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    month: "short",
    year: "numeric",
  });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
