import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Startpagina",
  robots: { index: false, follow: false },
};

const ACTIONS = [
  {
    href: "/dashboard/blog/nieuw",
    title: "Nieuw bericht plaatsen",
    body: "Schrijf een nieuwe blogpost of mededeling voor het netwerk.",
    cta: "Bericht schrijven",
  },
  {
    href: "/dashboard/agenda/nieuw",
    title: "Event toevoegen aan de agenda",
    body: "Plan een opendeur, vergadering of opleiding voor de partners.",
    cta: "Event toevoegen",
  },
  {
    href: "/dashboard/leden",
    title: "Andere partners bekijken",
    body: "Bekijk de architecten en vakspecialisten in het netwerk.",
    cta: "Naar de ledenlijst",
  },
];

export default async function DashboardPage() {
  const user = await requireUser();
  const greetingName =
    user.full_name ?? user.email.split("@")[0] ?? "partner";

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      <header>
        <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
          Welkom terug
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] text-ink">
          Hallo,{" "}
          <span className="italic text-sage">{greetingName}</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[18px]">
          Vanuit deze pagina beheert u uw blogberichten en de gedeelde
          agenda. Klik op één van de drie kaarten hieronder om te
          beginnen.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
        {ACTIONS.map((a, i) => (
          <li key={a.href}>
            <Link
              href={a.href}
              className="group flex h-full flex-col rounded-3xl border border-ink-hair/60 bg-surface-soft/40 p-7 transition-all hover:-translate-y-1 hover:border-sage hover:bg-surface-soft/80"
            >
              <span className="font-display text-[44px] font-light leading-none text-sage">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 font-display text-[26px] font-medium leading-[1.15] text-ink">
                {a.title}
              </h2>
              <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-soft">
                {a.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-3 text-[15px] font-medium text-ink transition-colors group-hover:text-sage">
                {a.cta}
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-hair/70 transition-colors group-hover:border-sage group-hover:bg-sage group-hover:text-white"
                >
                  <svg
                    viewBox="0 0 16 10"
                    className="h-3 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 5h14M11 1l4 4-4 4" />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-20 rounded-3xl border border-ink-hair/50 bg-surface-soft/30 p-7 md:mt-28 md:p-10">
        <h2 className="font-display text-[24px] font-medium leading-[1.2] text-ink md:text-[28px]">
          Hulp nodig?
        </h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-ink-soft">
          Heeft u vragen of komt u er niet uit? Stuur een e-mail naar{" "}
          <a
            href="mailto:info@renocheck.be"
            className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
          >
            info@renocheck.be
          </a>{" "}
          of bel ons op{" "}
          <a
            href="tel:+3231234567"
            className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
          >
            +32 (0)3 123 45 67
          </a>
          . We helpen u graag persoonlijk verder.
        </p>
      </section>
    </article>
  );
}
