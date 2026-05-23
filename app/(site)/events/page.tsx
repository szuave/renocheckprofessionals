import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import { BreadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Aankomende Renocheck events voor architecten, aannemers en interieurprofessionals — ontmoetingen, beurzen en exclusieve avonden.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events · Renocheck Professionals",
    description:
      "Onze aankomende events, opendeuren en beurzen in België.",
    url: "/events",
    type: "website",
  },
  twitter: {
    title: "Events · Renocheck Professionals",
    description:
      "Onze aankomende events, opendeuren en beurzen in België.",
  },
};

const FEATURED = {
  date: "14 mei 2026",
  city: "Antwerpen",
  title: "Renocheck Salon",
  tagline: "Een avond voor bouwprofessionals",
  body: "Een intieme avond in een gerestaureerd pand — met een voorproefje van de nieuwe Hometrends collectie, gesprekken met architecten en een glas uit de Loire.",
  image:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=90",
  alt: "Renocheck Salon — avondevent in Antwerpen",
};

const AGENDA = [
  {
    date: "22 mei 2026",
    city: "Gent",
    title: "Hometrends opendeur",
  },
  {
    date: "06 juni 2026",
    city: "Brussel",
    title: "Architecture Days",
  },
  {
    date: "19 juni 2026",
    city: "Brugge",
    title: "Partners aan tafel",
  },
  {
    date: "03 september 2026",
    city: "Leuven",
    title: "Signage & branding workshop",
  },
];

export default function EventsPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Events", url: "/events" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">Events</p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Waar u ons{" "}
          <span className="italic text-sage">ontmoet</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          Salons, beurzen en intieme avonden — een selectie van de
          eerstvolgende Renocheck momenten in België.
        </p>
      </section>

      <section
        aria-labelledby="featured-title"
        className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24"
      >
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-7">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] bg-ink/5 md:aspect-[4/3]">
              <Image
                src={FEATURED.image}
                alt={FEATURED.alt}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Uitgelicht</p>
            <h2
              id="featured-title"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] text-ink"
            >
              {FEATURED.title}
            </h2>
            <p className="mt-4 font-display text-[22px] italic leading-[1.3] text-sage md:text-[26px]">
              {FEATURED.tagline}
            </p>
            <p className="mt-8 max-w-md text-[17px] leading-[1.7] text-ink-soft md:text-[18px]">
              {FEATURED.body}
            </p>
            <p className="mt-8 text-[15px] text-ink-muted">
              {FEATURED.date} · {FEATURED.city}
            </p>
            <div className="mt-10">
              <PillLink href="/contact">Reserveer uw plaats</PillLink>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="agenda-title"
        className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24"
      >
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Agenda</p>
            <h2
              id="agenda-title"
              className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
            >
              Alles op{" "}
              <span className="italic text-sage">komst</span>.
            </h2>
          </div>

          <ul className="min-w-0 md:col-span-7">
            {AGENDA.map((e, i) => (
              <li
                key={e.title}
                className={`grid grid-cols-[auto_1fr] gap-x-10 gap-y-1 py-8 md:py-10 ${
                  i === 0 ? "border-t border-ink-hair/60" : ""
                } border-b border-ink-hair/60`}
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-ink-muted md:self-center">
                  {e.date}
                </p>
                <p className="text-right text-[13px] font-medium uppercase tracking-[0.28em] text-ink-muted md:self-center">
                  {e.city}
                </p>
                <h3 className="col-span-2 font-display text-[28px] font-medium leading-[1.15] text-ink md:text-[34px]">
                  {e.title}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1280px] px-6 md:mt-44 md:px-16 lg:px-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Altijd op de hoogte</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Events{" "}
              <span className="italic text-sage">eerst</span> in uw
              mailbox.
            </h2>
            <div className="mt-10">
              <PillLink href="/login">Word Renocheck lid</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Onze ledenlijst krijgt uitnodigingen voor besloten avonden,
              previews en opendeuren — vóór ze publiek worden aangekondigd.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
