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

type NavItem = { href: string; label: string; exact?: boolean };

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Startpagina", exact: true },
  { href: "/dashboard/blog", label: "Blog & berichten" },
  { href: "/dashboard/agenda", label: "Agenda" },
  { href: "/dashboard/leden", label: "Andere partners" },
];

const ADMIN_NAV: NavItem[] = [
  { href: "/dashboard/inbox", label: "Inbox" },
  { href: "/dashboard/beheer", label: "Beheer" },
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

  const isAdmin = user.role === "admin";

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
        isAdmin={isAdmin}
        user={user}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-1 flex-col lg:flex-row">
        <DesktopSidebar pathname={pathname} isAdmin={isAdmin} user={user} />
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function DesktopSidebar({
  pathname,
  isAdmin,
  user,
}: {
  pathname: string;
  isAdmin: boolean;
  user: DashboardUser;
}) {
  return (
    <aside
      aria-label="Dashboard navigatie"
      className="hidden shrink-0 lg:block lg:w-[320px]"
    >
      <div className="sticky top-0 flex h-screen flex-col border-r border-ink-hair/40 bg-gradient-to-b from-surface-soft/60 via-white to-white px-9 py-12">
        <Link
          href="/"
          aria-label="Renocheck Professionals — naar publieke site"
          className="inline-flex flex-col items-start text-ink"
        >
          <Image
            src="/brand/renocheck-wordmark.png"
            alt="Renocheck"
            width={264}
            height={32}
            priority
            className="select-none"
          />
          <span
            className="mt-2.5 text-[11px] font-medium uppercase text-ink"
            style={{ letterSpacing: "0.42em", marginLeft: 40 }}
          >
            Professionals
          </span>
        </Link>

        <NavSection label="Portaal" className="mt-12">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActive(pathname, item)}
            />
          ))}
        </NavSection>

        {isAdmin ? (
          <NavSection label="Admin" className="mt-8" divider>
            {ADMIN_NAV.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isActive(pathname, item)}
              />
            ))}
          </NavSection>
        ) : null}

        <div className="mt-auto pt-8">
          <UserCard user={user} />
        </div>
      </div>
    </aside>
  );
}

function NavSection({
  label,
  divider,
  className,
  children,
}: {
  label: string;
  divider?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      {divider ? (
        <div
          aria-hidden="true"
          className="mb-6 h-px w-full bg-gradient-to-r from-ink-hair/0 via-ink-hair/60 to-ink-hair/0"
        />
      ) : null}
      <div className="flex items-center gap-3 px-1">
        <span
          aria-hidden="true"
          className="h-px w-6 bg-sage/70"
        />
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
          {label}
        </p>
      </div>
      <nav className="mt-4 flex flex-col gap-0.5">{children}</nav>
    </div>
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
  isAdmin,
  user,
  onClose,
}: {
  open: boolean;
  pathname: string;
  isAdmin: boolean;
  user: DashboardUser;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 flex flex-col overflow-y-auto bg-white px-6 pb-10 pt-24 transition-opacity duration-300 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <MobileNavSection label="Portaal">
        {NAV.map((item) => (
          <MobileNavLink
            key={item.href}
            item={item}
            active={isActive(pathname, item)}
            onClose={onClose}
          />
        ))}
      </MobileNavSection>

      {isAdmin ? (
        <MobileNavSection label="Admin" className="mt-10" divider>
          {ADMIN_NAV.map((item) => (
            <MobileNavLink
              key={item.href}
              item={item}
              active={isActive(pathname, item)}
              onClose={onClose}
            />
          ))}
        </MobileNavSection>
      ) : null}

      <div className="mt-auto pt-10">
        <UserCard user={user} />
      </div>
    </div>
  );
}

function MobileNavSection({
  label,
  divider,
  className,
  children,
}: {
  label: string;
  divider?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      {divider ? (
        <div
          aria-hidden="true"
          className="mb-6 h-px w-full bg-gradient-to-r from-ink-hair/0 via-ink-hair/60 to-ink-hair/0"
        />
      ) : null}
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-6 bg-sage/70" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
          {label}
        </p>
      </div>
      <nav className="mt-4 flex flex-col gap-1">{children}</nav>
    </div>
  );
}

function MobileNavLink({
  item,
  active,
  onClose,
}: {
  item: { href: string; label: string };
  active: boolean;
  onClose: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "py-3 font-display text-[30px] font-medium leading-tight transition-colors",
        active ? "italic text-sage" : "text-ink hover:text-sage",
      )}
    >
      {item.label}
    </Link>
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
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-all duration-200",
        active
          ? "bg-ink text-white shadow-[0_1px_2px_rgba(15,23,20,0.18)]"
          : "text-ink-soft hover:bg-surface-soft/80 hover:text-ink",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-4 w-[3px] rounded-full transition-all duration-200",
          active
            ? "bg-sage-glow"
            : "bg-transparent group-hover:bg-sage/50",
        )}
      />
      <span className="font-medium tracking-tight">{item.label}</span>
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

  const initials = displayName
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-ink-hair/50 bg-white/80 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[14px] font-medium",
            user.role === "admin"
              ? "bg-ink text-white"
              : "bg-sage/10 text-sage-dark ring-1 ring-sage/30",
          )}
        >
          {initials || "—"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[17px] font-medium leading-tight text-ink">
            {displayName}
          </p>
          <p className="truncate text-[12px] text-ink-muted">
            {user.company ?? user.email}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.32em] text-ink-muted">
        {user.role === "admin" ? "Admin account" : "Partner account"}
      </p>
      <Link
        href="/dashboard/account"
        className="mt-3 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-transparent px-4 py-2 text-[12.5px] font-medium text-ink-soft transition-colors hover:bg-surface-soft/60 hover:text-ink"
      >
        <span>Mijn account</span>
        <span aria-hidden="true" className="text-[13px]">
          →
        </span>
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="mt-1.5 inline-flex w-full items-center justify-between gap-2 rounded-xl border border-ink-hair/70 bg-white px-4 py-2.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-sage hover:text-ink disabled:opacity-50"
      >
        <span>{signingOut ? "Bezig met uitloggen…" : "Uitloggen"}</span>
        <span aria-hidden="true" className="text-[14px]">
          →
        </span>
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
