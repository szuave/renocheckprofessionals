"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PillLink } from "@/components/pill-button";

const NAV_ITEMS = [
  { href: "/architecten", label: "Architecten" },
  { href: "/vakspecialisten", label: "Vakspecialisten" },
  { href: "/bouwondernemers", label: "Bouwondernemers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function Wordmark({ size = 44, stacked = true }: { size?: number; stacked?: boolean }) {
  // Source PNG is 338x41 (≈ 8.24:1), already trimmed.
  const height = Math.round(size * 0.95);
  const width = Math.round(height * (338 / 41));
  const tagSize = Math.max(Math.round(size * 0.22), 10);
  return (
    <span className="inline-flex flex-col items-start text-ink">
      <Image
        src="/brand/renocheck-wordmark.png"
        alt="Renocheck"
        width={width}
        height={height}
        priority
        style={{ width, height }}
        className="select-none"
      />
      {stacked ? (
        <span
          style={{
            fontSize: tagSize,
            letterSpacing: "0.4em",
            marginLeft: Math.round(height * 1.25),
          }}
          className="mt-2.5 font-medium uppercase text-ink"
        >
          Professionals
        </span>
      ) : null}
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <>
      <MobileBar open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
      <MobileOverlay
        open={mobileOpen}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Hoofdnavigatie"
      className="hidden shrink-0 lg:block lg:w-[440px]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-end justify-between px-10 py-14">
        <Link
          href="/"
          aria-label="Renocheck Professionals — home"
          className="enter-up delay-100"
        >
          <Wordmark size={52} />
        </Link>

        <nav className="flex flex-col items-end gap-5">
          {NAV_ITEMS.map((item, i) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group enter-up relative text-[38px] font-normal leading-[1.08] tracking-tight transition-colors duration-300",
                  active
                    ? "italic text-sage"
                    : "text-ink-soft hover:text-ink",
                )}
                style={{ animationDelay: `${250 + i * 80}ms` }}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1.5 right-0 h-px origin-right bg-sage transition-transform duration-500 ease-out",
                    active
                      ? "w-12 scale-x-100"
                      : "w-12 scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <PillLink
          href="/login"
          icon="user"
          className="enter-up delay-800"
        >
          Login als lid
        </PillLink>
      </div>
    </aside>
  );
}

/* ---------------- MOBILE ---------------- */

function MobileBar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between gap-3 rounded-full bg-white/85 py-2.5 pl-5 pr-2 shadow-[0_2px_14px_-2px_rgba(28,27,24,0.08)] ring-1 ring-ink/[0.04] backdrop-blur-xl">
          <Link href="/" aria-label="Renocheck Professionals — home">
            <Wordmark size={28} stacked={false} />
          </Link>
          <button
            type="button"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            onClick={onToggle}
            className="relative z-[60] flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] text-ink"
          >
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-300",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-current transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-300",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileOverlay({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-white transition-opacity duration-500 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex flex-1 flex-col justify-center px-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Renocheck Professionals
        </p>
        <nav className="mt-10 flex flex-col gap-5">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "text-5xl font-light leading-tight tracking-tight transition-colors",
                  active
                    ? "italic text-sage"
                    : "text-ink hover:text-sage",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-ink-hair/60 px-8 py-6">
        <PillLink href="/login" icon="user" onClick={onClose}>
          Login als Renocheck lid
        </PillLink>
      </div>
    </div>
  );
}
