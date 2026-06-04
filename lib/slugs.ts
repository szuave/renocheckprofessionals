// Reserved URL slugs. New partner pages may not use these — they collide with
// existing or future routes.
export const RESERVED_SLUGS = new Set<string>([
  // Top-level routes
  "admin",
  "api",
  "auth",
  "dashboard",
  "login",
  "logout",
  // Marketing
  "architecten",
  "bouwers",
  "bouwondernemers",
  "contact",
  "cookies",
  "events",
  "faq",
  "over-ons",
  "over",
  "privacy",
  "regio",
  "renovatiegids",
  "vakspecialisten",
  // Network / SEO
  "p",
  "partners",
  "partner",
  "leden",
  "ledenportaal",
  "blog",
  "nieuws",
  // Branding / infra
  "renocheck",
  "professionals",
  "www",
  "mail",
  "ftp",
  "static",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "sitemap",
  "manifest.webmanifest",
  "_next",
  // Reserved for future
  "settings",
  "account",
  "profile",
  "search",
]);

const SLUG_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/;

export function validateSlug(slug: string): string | null {
  if (!slug || typeof slug !== "string") return "Slug is verplicht";
  const s = slug.trim().toLowerCase();
  if (s.length < 2) return "Slug moet minstens 2 tekens zijn";
  if (s.length > 40) return "Slug mag maximum 40 tekens zijn";
  if (!SLUG_REGEX.test(s))
    return "Enkel lowercase letters, cijfers en koppeltekens (start/eindigt niet met -)";
  if (RESERVED_SLUGS.has(s))
    return `"${s}" is gereserveerd, kies een andere slug`;
  return null;
}

export function suggestSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}
