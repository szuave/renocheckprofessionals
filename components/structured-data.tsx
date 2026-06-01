const SITE_URL = "https://renocheck.be";

const RUBRIEKEN = [
  "Dakwerken",
  "Ramen & deuren",
  "Elektriciteit",
  "Sanitair",
  "Verwarming & airco",
  "Tegels & natuursteen",
  "Schrijnwerk",
  "Schilderwerken",
  "Vloeren",
  "Isolatie",
  "Tuinaanleg",
  "Zonnepanelen",
  "Zwembaden",
  "Keukens",
] as const;

const REGIONS = [
  "West-Vlaanderen",
  "Oost-Vlaanderen",
  "Antwerpen",
  "Vlaams-Brabant",
] as const;

const RUBRIEK_BUSINESS_TYPE: Record<string, string> = {
  Dakwerken: "RoofingContractor",
  "Ramen & deuren": "GeneralContractor",
  Elektriciteit: "Electrician",
  Sanitair: "Plumber",
  "Verwarming & airco": "HVACBusiness",
  "Tegels & natuursteen": "HomeAndConstructionBusiness",
  Schrijnwerk: "HomeAndConstructionBusiness",
  Schilderwerken: "HousePainter",
  Vloeren: "HomeAndConstructionBusiness",
  Isolatie: "HomeAndConstructionBusiness",
  Tuinaanleg: "HomeAndConstructionBusiness",
  Zonnepanelen: "HomeAndConstructionBusiness",
  Zwembaden: "GeneralContractor",
  Keukens: "HomeAndConstructionBusiness",
};

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Renocheck Professionals",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description:
      "Renocheck Professionals is het partnerportaal van Renocheck — voor architecten, aannemers en vakspecialisten. Beheer uw blog, agenda en ledencontacten op één plek.",
    email: "info@renocheck.be",
    telephone: "+32 3 123 45 67",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "Maxime Vandenbroucke",
        jobTitle: "Founder",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BE",
    },
    sameAs: [
      "https://instagram.com/renocheck",
      "https://facebook.com/renocheck",
      "https://linkedin.com/company/renocheck",
    ],
    areaServed: REGIONS.map((region) => ({
      "@type": "AdministrativeArea",
      name: region,
      containedInPlace: {
        "@type": "Country",
        name: "Belgium",
        identifier: "BE",
      },
    })),
    knowsAbout: [...RUBRIEKEN, ...REGIONS],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vakrubrieken Renocheck Professionals",
      itemListElement: RUBRIEKEN.map((rubriek) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: rubriek,
          provider: {
            "@type": "Organization",
            name: "Renocheck Professionals",
            url: SITE_URL,
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Renocheck Professionals",
    url: SITE_URL,
    inLanguage: "nl-BE",
    publisher: {
      "@type": "Organization",
      name: "Renocheck Professionals",
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/vakspecialisten?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ContactPageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Renocheck Professionals",
    url: `${SITE_URL}/contact`,
    description:
      "Neem contact op met Renocheck Professionals voor vragen over het partnerportaal, events of partnerschap.",
    mainEntity: {
      "@type": "Organization",
      name: "Renocheck Professionals",
      email: "info@renocheck.be",
      telephone: "+32 3 123 45 67",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@renocheck.be",
        telephone: "+32 3 123 45 67",
        availableLanguage: ["nl", "fr", "en"],
        areaServed: "BE",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function AboutPageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Over Renocheck Professionals",
    url: `${SITE_URL}/over-ons`,
    description:
      "Het verhaal achter Renocheck Professionals — het partnerportaal voor architecten, aannemers en vakspecialisten.",
    mainEntity: {
      "@type": "Organization",
      name: "Renocheck Professionals",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceSchema({
  rubriek,
  region,
}: {
  rubriek: string;
  region: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${rubriek} — Renocheck Professionals ${region}`,
    serviceType: rubriek,
    description: `Geselecteerde vakspecialisten ${rubriek.toLowerCase()} in ${region}. Eén vakman per rubriek per regio binnen het Renocheck Professionals netwerk — selectie op vakmanschap, niet op marketingbudget.`,
    provider: {
      "@type": "Organization",
      name: "Renocheck Professionals",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: region,
      containedInPlace: {
        "@type": "Country",
        name: "Belgium",
        identifier: "BE",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessSchemaByRubriek({
  rubriek,
  region,
}: {
  rubriek: string;
  region: string;
}) {
  const businessType =
    RUBRIEK_BUSINESS_TYPE[rubriek] ?? "HomeAndConstructionBusiness";

  const data = {
    "@context": "https://schema.org",
    "@type": businessType,
    name: `${rubriek} — Renocheck Professionals netwerk ${region}`,
    description: `Geselecteerde vakspecialist ${rubriek.toLowerCase()} binnen het Renocheck Professionals netwerk in ${region}.`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: region,
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Renocheck Professionals",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQPageSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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

export function RegionalServiceAreaSchema({
  region,
  cities,
}: {
  region: string;
  cities: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `Werkgebied Renocheck Professionals — ${region}`,
    description: `Renocheck Professionals bedient ${region} via één architect-bureau en veertien vakspecialisten per rubriek. Werkzaam in ${cities.join(", ")}.`,
    containedInPlace: {
      "@type": "Country",
      name: "Belgium",
      identifier: "BE",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "AdministrativeArea",
      value: region,
    },
    geoCoveredBy: cities.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: region,
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
