const SITE_URL = "https://renocheck.be";

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
    address: {
      "@type": "PostalAddress",
      addressCountry: "BE",
    },
    sameAs: [
      "https://instagram.com/renocheck",
      "https://facebook.com/renocheck",
      "https://linkedin.com/company/renocheck",
    ],
    areaServed: {
      "@type": "Country",
      name: "Belgium",
    },
    knowsAbout: [
      "Architectenbureaus",
      "Aannemers",
      "Vakspecialisten",
      "Renovatie",
      "Events voor bouwprofessionals",
      "Partnerportaal",
    ],
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
