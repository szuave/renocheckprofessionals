"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type LedenRow = {
  id: string;
  full_name: string | null;
  company: string | null;
  email: string;
  role: "admin" | "partner";
  partner_type: string | null;
  regions: string[];
  rubrieken: string[];
  slug: string | null;
};

const REGION_LABEL: Record<string, string> = {
  "west-vlaanderen": "West-Vlaanderen",
  "oost-vlaanderen": "Oost-Vlaanderen",
  antwerpen: "Antwerpen",
  "vlaams-brabant": "Vlaams-Brabant",
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function LedenList({ profiles }: { profiles: LedenRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const tokens = normalize(query).split(" ").filter(Boolean);
    if (tokens.length === 0) return profiles;
    return profiles.filter((p) => {
      const hay = normalize(
        [
          p.full_name,
          p.company,
          p.email,
          p.partner_type,
          p.slug,
          ...p.regions.map((r) => REGION_LABEL[r] ?? r),
          ...p.rubrieken,
        ]
          .filter(Boolean)
          .join(" "),
      );
      return tokens.every((t) => hay.includes(t));
    });
  }, [profiles, query]);

  return (
    <>
      <div className="mt-10 max-w-md md:mt-12">
        <label
          htmlFor="leden-search"
          className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
        >
          Zoeken
        </label>
        <div className="relative mt-3">
          <input
            id="leden-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Naam, bedrijf, regio, rubriek…"
            className="w-full rounded-xl border border-ink-hair/70 bg-white/60 px-4 py-3 pr-9 text-[15px] text-ink placeholder:text-ink-muted/60 focus:border-sage focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Zoekopdracht wissen"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px] leading-none text-ink-muted hover:text-ink"
            >
              ×
            </button>
          ) : null}
        </div>
        {query ? (
          <p className="mt-2 text-[12px] text-ink-muted">
            {filtered.length} resultaat{filtered.length === 1 ? "" : "en"}
          </p>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-ink-hair p-8 text-center text-[15px] text-ink-soft">
          Geen partners gevonden voor "{query}".
        </p>
      ) : (
        <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const regionsDisplay = p.regions
              .map((r) => REGION_LABEL[r] ?? r)
              .join(", ");
            const rubriekenDisplay = p.rubrieken.join(", ");
            return (
              <li key={p.id}>
                <Link
                  href={`/dashboard/leden/${p.id}`}
                  className="group block h-full rounded-2xl border border-ink-hair/60 bg-surface-soft/30 p-6 transition-colors hover:border-sage hover:bg-surface-soft/60"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
                    {p.partner_type ??
                      (p.role === "admin" ? "Renocheck team" : "Partner")}
                    {regionsDisplay ? ` · ${regionsDisplay}` : ""}
                  </p>
                  <h2 className="mt-3 font-display text-[24px] font-medium leading-[1.15] text-ink transition-colors group-hover:text-sage">
                    {p.full_name ?? p.company ?? "Naamloos"}
                  </h2>
                  {p.company && p.full_name ? (
                    <p className="mt-1 text-[14px] text-ink-soft">{p.company}</p>
                  ) : null}
                  {rubriekenDisplay ? (
                    <p className="mt-3 text-[13px] text-ink-muted">
                      {p.rubrieken.length > 1 ? "Rubrieken" : "Rubriek"}:{" "}
                      {rubriekenDisplay}
                    </p>
                  ) : null}
                  {p.slug ? (
                    <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-ink-muted/70">
                      /{p.slug}
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
