import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/structured-data";
import { FAQ_ITEMS } from "./data";
import { FAQClient } from "./faq-client";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Veelgestelde vragen over Renocheck Professionals — partnerschap, regio's, events, en hoe het netwerk werkt voor bouwers, architecten en vakspecialisten.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ · Renocheck Professionals",
    description:
      "Antwoorden op de meest gestelde vragen over Renocheck Professionals.",
    url: "/faq",
    type: "website",
  },
  twitter: {
    title: "FAQ · Renocheck Professionals",
    description:
      "Antwoorden op de meest gestelde vragen over Renocheck Professionals.",
  },
};

function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FAQPage() {
  return (
    <article className="relative pt-36 pb-14 sm:pt-44 md:pt-52">
      <FAQSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      <section className="mx-auto max-w-[1280px] px-6 md:px-16 lg:px-24">
        <p className="enter-up delay-300 text-[18px] text-ink-soft">FAQ</p>

        <h1 className="enter-up delay-400 mt-6 font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-[0.98] text-ink">
          Vragen, kort{" "}
          <span className="italic text-sage">beantwoord</span>.
        </h1>

        <p className="enter-up delay-500 mt-8 max-w-2xl text-[17px] leading-[1.65] text-ink-soft md:text-[19px]">
          De meest gestelde vragen over het netwerk, partnerschap en de manier
          waarop we werken. Staat uw vraag er niet bij? Mail{" "}
          <a
            href="mailto:info@renocheck.be"
            className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
          >
            info@renocheck.be
          </a>
          .
        </p>
      </section>

      <FAQClient />
    </article>
  );
}
