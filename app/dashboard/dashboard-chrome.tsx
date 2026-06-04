"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/login/actions";

type DashboardUser = {
  email: string;
  name: string | null;
  company: string | null;
  role: "admin" | "partner";
};

const NAV = [
  { href: "/dashboard", label: "Startpagina", exact: true },
  { href: "/dashboard/blog", label: "Blog & berichten" },
  { href: "/dashboard/agenda", label: "Agenda" },
  { href: "/dashboard/leden", label: "Andere partners" },
];

const ADMIN_NAV = [
  { href: "/dashboard/inbox", label: "Inbox (admin)" },
  { href: "/dashboard/beheer", label: "Beheer (admin)" },
];

export function DashboardChrome({
  children,
  user,
}: {
  children: React.ReactNode;
  user: DashboardUser;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = user.role === "admin" ? [...NAV, ...ADMIN_NAV] : NAV;

  return (
    <div className="relative z-[2] mx-auto flex w-full max-w-[1920px] flex-1 flex-col">
      <MobileBar
        open={mobileOpen}
        onToggle={() => setMobileOpen((v) => !v)}
        user={user}
      />
      <MobileOverlay
        open={mobileOpen}
        pathname={pathname}
        navItems={navItems}
        user={user}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col lg:flex-row">
        <DesktopSidebar
          pathname={pathname}
          navItems={navItems}
          user={user}
        />
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function DesktopSidebar({
  pathname,
  navItems,
  user,
}: {
  pathname: string;
  navItems: { href: string; label: string; exact?: boolean }[];
  user: DashboardUser;
}) {
  return (
    <aside
      aria-label="Dashboard navigatie"
      className="hidden shrink-0 lg:block lg:w-[300px]"
    >
      <div className="sticky top-0 flex h-screen flex-col border-r border-ink-hair/40 px-10 py-12">
        <Link
          href="/"
          aria-label="Renocheck Professionals — naar publieke site"
          className="inline-flex flex-col items-start text-ink"
        >
          <Image
            src="/brand/renocheck-wordmark.png"
            alt="Renocheck"
            width={297}
            height={36}
            priority
            className="select-none"
          />
          <span
            className="mt-2.5 text-[12px] font-medium uppercase text-ink"
            style={{ letterSpacing: "0.4em", marginLeft: 44 }}
          >
            Professionals
          </span>
        </Link>

        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
          Partnerportaal
        </p>

        <nav className="mt-14 flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActive(pathname, item)}
            />
          ))}
        </nav>

        <UserCard user={user} />
      </div>
    </aside>
  );
}

function MobileBar({
  open,
  onToggle,
  user,
}: {
  open: boolean;
  onToggle: () => void;
  user: DashboardUser;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-hair/40 bg-white/80 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Renocheck Professionals — naar publieke site"
          className="inline-flex flex-col items-start text-ink"
        >
          <Image
            src="/brand/renocheck-wordmark.png"
            alt="Renocheck"
            width={198}
            height={24}
            priority
            className="select-none"
          />
          <span
            className="mt-1 text-[10px] font-medium uppercase text-ink"
            style={{ letterSpacing: "0.4em", marginLeft: 28 }}
          >
            Professionals
          </span>
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] text-ink"
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
      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted">
        {user.role === "admin"
          ? "Admin · Renocheck Professionals"
          : "Partner · Renocheck Professionals"}
      </p>
    </header>
  );
}

function MobileOverlay({
  open,
  pathname,
  navItems,
  user,
  onClose,
}: {
  open: boolean;
  pathname: string;
  navItems: { href: string; label: string; exact?: boolean }[];
  user: DashboardUser;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 flex flex-col bg-white px-6 pb-10 pt-24 transition-opacity duration-300 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "py-3 font-display text-[36px] font-medium leading-tight transition-colors",
              isActive(pathname, item)
                ? "italic text-sage"
                : "text-ink hover:text-sage",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-10">
        <UserCard user={user} />
      </div>
    </div>
  );
}

function NavLink({
  item,
  active,
}: {
  item: { href: string; label: string };
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center justify-between rounded-2xl px-5 py-4 text-[17px] transition-colors",
        active
          ? "bg-ink text-white"
          : "text-ink hover:bg-surface-soft/70",
      )}
    >
      <span className="font-medium">{item.label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-opacity",
          active ? "bg-sage-glow opacity-100" : "bg-sage opacity-0",
        )}
      />
    </Link>
  );
}

function UserCard({ user }: { user: DashboardUser }) {
  const [signingOut, startSignOut] = useTransition();

  function handleSignOut() {
    startSignOut(() => {
      logoutAction();
    });
  }

  const displayName = user.name ?? user.email.split("@")[0];

  return (
    <div className="mt-auto rounded-2xl border border-ink-hair/50 bg-surface-soft/40 p-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {user.role === "admin" ? "Admin" : "Partner"}
      </p>
      <p className="mt-2 truncate font-display text-[20px] font-medium leading-tight text-ink">
        {displayName}
      </p>
      {user.company ? (
        <p className="truncate text-[12px] text-ink-muted">{user.company}</p>
      ) : (
        <p className="truncate text-[12px] text-ink-muted">{user.email}</p>
      )}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-hair/70 bg-white/70 px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:border-sage hover:text-sage disabled:opacity-50"
      >
        {signingOut ? "Bezig met uitloggen…" : "Uitloggen"}
      </button>
    </div>
  );
}

function isActive(
  pathname: string,
  item: { href: string; exact?: boolean },
): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
