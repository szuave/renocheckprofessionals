import Image from "next/image";
import Link from "next/link";

function SocialIcon({
  name,
  className,
}: {
  name: "instagram" | "facebook" | "linkedin";
  className?: string;
}) {
  if (name === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7V14h2.7v8h3.1z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3.5 9.5h3v11h-3v-11zm5 0h2.9v1.5h.04c.4-.75 1.4-1.55 2.86-1.55 3.06 0 3.63 2 3.63 4.63V20.5h-3v-5.24c0-1.25-.02-2.87-1.75-2.87s-2.02 1.37-2.02 2.78V20.5h-3v-11z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-[2] px-4 pb-6 pt-14 sm:px-6 md:px-16 md:pb-14 md:pt-[104px] lg:px-24 lg:pt-[152px]">
      <div className="rounded-[28px] border border-ink-hair/60 bg-surface-soft/60 px-6 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] backdrop-blur-sm sm:px-8 md:rounded-[32px] md:px-16 lg:px-24">
        <div className="pt-14 pb-8 md:pt-20 md:pb-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Renocheck Professionals — home"
              className="inline-flex flex-col items-start text-ink"
            >
              <Image
                src="/brand/renocheck-wordmark.png"
                alt="Renocheck"
                width={338}
                height={41}
                className="h-[44px] w-auto select-none sm:h-[52px] md:h-[60px]"
                sizes="(max-width: 640px) 360px, (max-width: 768px) 430px, 500px"
              />
              <span
                className="mt-3 text-[13px] font-medium uppercase text-ink sm:text-[14px]"
                style={{ letterSpacing: "0.4em", marginLeft: "3.5rem" }}
              >
                Professionals
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.7] text-ink-soft md:mt-8">
              Het partnerportaal voor architecten, aannemers en
              vakspecialisten.
            </p>
            <div className="mt-8 flex items-center gap-5 md:mt-10">
              {(["instagram", "facebook", "linkedin"] as const).map((name) => (
                <a
                  key={name}
                  href={`https://${name}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Renocheck op ${name.charAt(0).toUpperCase() + name.slice(1)}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-hair/60 text-ink-soft transition-colors hover:border-sage hover:bg-sage/20 hover:text-ink"
                >
                  <SocialIcon name={name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            className="md:col-span-3"
            title="Het netwerk"
            links={[
              { href: "/bouwers", label: "Voor bouwers" },
              { href: "/architecten", label: "Architecten" },
              { href: "/vakspecialisten", label: "Vakspecialisten" },
              { href: "/events", label: "Events" },
            ]}
          />
          <FooterColumn
            className="md:col-span-2"
            title="Renocheck Professionals"
            links={[
              { href: "/over-ons", label: "Over ons" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contact" },
              { href: "/login", label: "Partner login" },
            ]}
          />

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
              Contact
            </h4>
            <ul className="mt-6 space-y-2 text-[15px] text-ink-soft">
              <li>
                <a
                  href="mailto:info@renocheck.be"
                  className="transition-colors hover:text-ink"
                >
                  info@renocheck.be
                </a>
              </li>
              <li>
                <a
                  href="tel:+3231234567"
                  className="transition-colors hover:text-ink"
                >
                  +32 (0)3 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-hair/50 pt-6 text-[11px] text-ink-muted md:mt-16 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Renocheck Professionals. Alle rechten
            voorbehouden.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href="/privacy" className="hover:text-ink">
              Privacybeleid
            </Link>
            <Link href="/cookies" className="hover:text-ink">
              Cookiebeleid
            </Link>
            <span aria-hidden="true" className="hidden h-3 w-px bg-ink-hair md:inline-block" />
            <p>
              Gemaakt door{" "}
              <span className="font-medium text-ink-soft">nebula</span>
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink">
        {title}
      </h4>
      <ul className="mt-6 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
