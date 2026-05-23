import type { Metadata } from "next";
import Image from "next/image";
import { PillLink } from "@/components/pill-button";
import {
  AboutPageSchema,
  BreadcrumbSchema,
} from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Renocheck is het platform dat bouwprofessionals — architecten, aannemers en interieurpros — ondersteunt met producten, planners, events en een persoonlijk ledenportaal.",
  alternates: { canonical: "/over-ons" },
  openGraph: {
    title: "Over Renocheck Professionals",
    description:
      "Het verhaal achter Renocheck — tools, producten en events voor de bouwsector.",
    url: "/over-ons",
    type: "article",
  },
  twitter: {
    title: "Over Renocheck Professionals",
    description:
      "Het verhaal achter Renocheck — tools, producten en events voor de bouwsector.",
  },
};

export default function OverOnsPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <AboutPageSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Over ons", url: "/over-ons" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">
          Over Renocheck
        </p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.98] text-ink">
          Het platform voor{" "}
          <span className="italic text-sage">elk</span> vak.
        </h1>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Onze missie</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Eén plek voor elk{" "}
              <span className="italic text-sage">bedrijf</span>.
            </h2>
            <div className="mt-10">
              <PillLink href="/contact">Neem contact op</PillLink>
            </div>
          </div>
          <div className="min-w-0 space-y-6 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Bouwprofessionals verliezen te veel tijd met het sprokkelen van
              goodies, planners en signage. Renocheck brengt alles samen in
              één platform.
            </p>
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Met een persoonlijk ledenportaal beheert u bestellingen, events
              en notificaties — afgestemd op uw manier van werken.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="verhaal-title"
        className="relative mt-32 md:mt-48"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
          <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
            <div className="min-w-0 md:col-span-7">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-ink/5 md:aspect-[5/4]">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=90"
                  alt="Renocheck atelier"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 md:col-span-5">
              <p className="text-[18px] text-ink-soft">Ons verhaal</p>
              <h2
                id="verhaal-title"
                className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink"
              >
                Opgericht door en{" "}
                <span className="italic text-sage">voor</span> de sector.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-ink-soft md:text-[18px]">
                <p>
                  Renocheck begon als een notitieboekje tussen twee
                  architecten — een lijstje van wat een bureau écht nodig had
                  om zich professioneel te presenteren.
                </p>
                <p>
                  Wat begon als een persoonlijke oplossing groeide uit tot een
                  platform dat vandaag honderden bureaus in België
                  ondersteunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1280px] px-6 md:mt-48 md:px-16 lg:px-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-16">
          <div className="min-w-0 md:col-span-5">
            <p className="text-[18px] text-ink-soft">Aan de slag</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] text-ink">
              Benieuwd of Renocheck iets voor u{" "}
              <span className="italic text-sage">is</span>?
            </h2>
            <div className="mt-10">
              <PillLink href="/contact">Start een gesprek</PillLink>
            </div>
          </div>
          <div className="min-w-0 md:col-span-7">
            <p className="text-[19px] leading-[1.7] text-ink-soft md:text-[20px]">
              Laat ons uw vraag of situatie weten — we denken graag mee en
              komen binnen één werkdag terug.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
