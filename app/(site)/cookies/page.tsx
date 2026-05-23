import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description:
    "Welke cookies Renocheck Professionals gebruikt, waarvoor, en hoe u ze beheert.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

const COOKIES: {
  name: string;
  purpose: string;
  duration: string;
  type: "Noodzakelijk" | "Functioneel" | "Analytisch";
}[] = [
  {
    name: "renocheck_session",
    purpose:
      "Bewaart uw login-sessie voor het partnerportaal. Zonder deze cookie kan u niet ingelogd blijven.",
    duration: "30 dagen",
    type: "Noodzakelijk",
  },
];

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Wat zijn cookies?",
    body: [
      "Cookies zijn kleine tekstbestandjes die uw browser opslaat wanneer u een website bezoekt. Ze helpen ons om uw sessie te herkennen of de website beter te laten werken.",
    ],
  },
  {
    title: "2. Welke cookies gebruiken we?",
    body: [
      "We gebruiken uitsluitend strikt noodzakelijke cookies — geen tracking, geen advertenties, geen externe analytics op dit moment. Zie het overzicht hieronder voor de details.",
    ],
  },
  {
    title: "3. Cookies beheren",
    body: [
      "U kan cookies altijd weigeren of verwijderen via de instellingen van uw browser. Let op: als u de sessie-cookie verwijdert, wordt u uitgelogd uit het partnerportaal en moet u opnieuw inloggen.",
      "Instructies per browser: Chrome (Instellingen → Privacy → Cookies), Safari (Voorkeuren → Privacy), Firefox (Instellingen → Privacy & beveiliging).",
    ],
  },
  {
    title: "4. Wijzigingen",
    body: [
      "Als we in de toekomst extra cookies toevoegen (bv. anonieme analytics), passen we dit beleid aan en vragen we waar nodig uw expliciete toestemming.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Cookiebeleid", url: "/cookies" },
        ]}
      />

      <section className="mx-auto max-w-[900px] px-6 md:px-16 lg:px-24">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Juridisch
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.02] text-ink">
          Cookie<span className="italic text-sage">beleid</span>.
        </h1>
        <p className="mt-6 text-[14px] text-ink-muted">
          Laatst bijgewerkt op 23 mei 2026.
        </p>

        <p className="mt-12 text-[18px] leading-[1.7] text-ink-soft md:text-[19px]">
          Renocheck Professionals gebruikt enkel strikt noodzakelijke cookies
          om het partnerportaal te laten werken. Geen tracking, geen
          advertenties.
        </p>

        <div className="mt-16 space-y-12 md:mt-20">
          <section>
            <h2 className="font-display text-[24px] font-medium leading-[1.2] text-ink md:text-[28px]">
              Cookies in gebruik
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-ink-hair/60">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-surface-soft/60 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                  <tr>
                    <th className="px-5 py-4 font-medium">Naam</th>
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Duur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-hair/50">
                  {COOKIES.map((c) => (
                    <tr key={c.name} className="align-top">
                      <td className="px-5 py-5">
                        <code className="rounded bg-surface-soft/80 px-2 py-1 text-[13px] text-ink">
                          {c.name}
                        </code>
                        <p className="mt-2 text-[13px] leading-[1.6] text-ink-soft">
                          {c.purpose}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-[13px] text-ink-soft">
                        {c.type}
                      </td>
                      <td className="px-5 py-5 text-[13px] text-ink-soft">
                        {c.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-[24px] font-medium leading-[1.2] text-ink md:text-[28px]">
                {s.title}
              </h2>
              <div className="mt-5 space-y-4 text-[16px] leading-[1.75] text-ink-soft">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-ink-hair/60 bg-surface-soft/40 p-6 md:p-10">
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            Meer weten over hoe we met uw gegevens omgaan? Lees ons{" "}
            <Link
              href="/privacy"
              className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
            >
              privacybeleid
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
