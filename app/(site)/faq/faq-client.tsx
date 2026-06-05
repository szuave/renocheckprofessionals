"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS, type Category } from "./data";

const CATEGORIES: { value: Category | "Alle"; label: string }[] = [
  { value: "Alle", label: "Alle" },
  { value: "Algemeen", label: "Algemeen" },
  { value: "Architecten", label: "Voor architecten" },
  { value: "Vakspecialisten", label: "Voor vakspecialisten" },
  { value: "Bouwondernemers", label: "Voor bouwondernemers" },
  { value: "Partnerschap", label: "Partnerschap" },
  { value: "Events", label: "Events" },
];

// Lowercase, strip diacritics, collapse punctuation to spaces.
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Synonym groups — typing any token expands to also match the others.
// Stored normalised. Each group is bidirectional via the buildSynonymMap.
const SYNONYM_GROUPS: string[][] = [
  ["vakman", "vakmensen", "vakspecialist", "vakspecialisten", "vakmanschap"],
  ["prijs", "prijzen", "kost", "kosten", "tarief", "bijdrage", "betalen"],
  ["regio", "regios", "provincie", "provincies", "gebied"],
  ["rubriek", "rubrieken", "categorie", "categorieen", "vak", "vakken"],
  ["aannemer", "aannemers", "bouwondernemer", "bouwondernemers", "algemene", "uitvoerder", "uitvoerders"],
  ["event", "events", "evenement", "evenementen", "bijeenkomst", "ontmoeting"],
  ["lid", "leden", "partner", "partners", "lidmaatschap", "aansluiten", "aansluiting"],
  ["architect", "architecten", "architectenbureau"],
  ["aannemer", "aannemers", "uitvoerder", "uitvoerders", "bouwondernemer", "bouwondernemers"],
  ["doorverwijzing", "doorverwijzingen", "lead", "leads", "opdracht", "opdrachten"],
  ["dakwerken", "dak"],
  ["sanitair", "loodgieter", "badkamer"],
  ["elektriciteit", "elektricien"],
  ["verwarming", "cv", "airco"],
  ["isolatie", "isoleren"],
  ["zonnepanelen", "fotovoltaisch", "pv"],
];

const SYNONYM_MAP: Record<string, string[]> = (() => {
  const map: Record<string, string[]> = {};
  for (const group of SYNONYM_GROUPS) {
    const normalised = group.map(normalize);
    for (const term of normalised) {
      map[term] = normalised;
    }
  }
  return map;
})();

function expand(token: string): string[] {
  return SYNONYM_MAP[token] ?? [token];
}

type Indexed = {
  item: (typeof FAQ_ITEMS)[number];
  hay: string;
  origIndex: number;
};

const INDEX: Indexed[] = FAQ_ITEMS.map((item, origIndex) => ({
  item,
  hay: normalize(`${item.category} ${item.question} ${item.answer}`),
  origIndex,
}));

export function FAQClient() {
  const [category, setCategory] = useState<Category | "Alle">("Alle");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const tokens = useMemo(
    () => normalize(query).split(" ").filter(Boolean),
    [query],
  );

  const searching = tokens.length > 0;

  const filtered = useMemo(() => {
    const pool = searching
      ? INDEX
      : category !== "Alle"
        ? INDEX.filter((i) => i.item.category === category)
        : INDEX;

    if (!searching) return pool.map((p) => p.item);

    const scored = pool
      .map((entry) => {
        let allMatch = true;
        let score = 0;
        for (const token of tokens) {
          const alts = expand(token);
          const matched = alts.find((alt) => entry.hay.includes(alt));
          if (!matched) {
            allMatch = false;
            break;
          }
          // Prefer matches in the question (early portion of haystack).
          const idx = entry.hay.indexOf(matched);
          score += idx < entry.item.question.length ? 3 : 1;
          if (entry.hay.startsWith(matched)) score += 2;
        }
        return allMatch ? { item: entry.item, score } : null;
      })
      .filter((x): x is { item: Indexed["item"]; score: number } => x !== null)
      .sort((a, b) => b.score - a.score);

    return scored.map((s) => s.item);
  }, [category, searching, tokens]);

  return (
    <section className="mx-auto mt-20 max-w-[1280px] px-6 md:mt-28 md:px-16 lg:px-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <aside className="min-w-0 md:col-span-4">
          <div className="md:sticky md:top-24">
            <label
              htmlFor="faq-search"
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted"
            >
              Zoeken
            </label>
            <div className="relative mt-3">
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(null);
                }}
                placeholder="Bv. rubrieken, regio…"
                className="w-full border-0 border-b border-ink-hair bg-transparent px-0 py-2 pr-8 text-base text-ink placeholder:text-ink-muted/60 focus:border-ink focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Zoekopdracht wissen"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[18px] leading-none text-ink-muted transition-colors hover:text-ink"
                >
                  ×
                </button>
              ) : null}
            </div>

            {searching ? (
              <p className="mt-3 text-[12px] text-ink-muted">
                Doorzoek <span className="font-medium text-ink">alle</span>{" "}
                categorieën.
              </p>
            ) : null}

            <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
              Categorie
            </p>
            <ul className="mt-4 space-y-1.5">
              {CATEGORIES.map((c) => {
                const active = !searching && category === c.value;
                return (
                  <li key={c.value}>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory(c.value);
                        setQuery("");
                        setOpen(null);
                      }}
                      className={cn(
                        "block w-full rounded-full px-4 py-2 text-left text-[14px] transition-colors",
                        active
                          ? "bg-ink text-white"
                          : searching
                            ? "text-ink-muted/70 hover:text-ink"
                            : "text-ink-soft hover:bg-surface-soft hover:text-ink",
                      )}
                    >
                      {c.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="min-h-[80vh] min-w-0 md:col-span-8">
          {searching ? (
            <p className="mb-6 text-[13px] text-ink-muted">
              {filtered.length === 0
                ? "Niets gevonden"
                : `${filtered.length} resultaat${filtered.length === 1 ? "" : "en"} voor "${query.trim()}"`}
            </p>
          ) : null}

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-ink-hair p-8 text-center text-[15px] text-ink-soft">
              Geen vragen gevonden. Probeer een ander woord, of mail{" "}
              <a
                href="mailto:info@renocheck.be"
                className="font-medium text-ink underline-offset-4 hover:text-sage hover:underline"
              >
                info@renocheck.be
              </a>
              .
            </p>
          ) : (
            <ul className="divide-y divide-ink-hair/60 border-t border-b border-ink-hair/60">
              {filtered.map((item) => {
                const key = `${item.category}-${item.question}`;
                const isOpen = open === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left md:py-9"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
                          {item.category}
                        </p>
                        <p className="mt-3 font-display text-[22px] font-medium leading-[1.2] text-ink transition-colors group-hover:text-sage md:text-[26px]">
                          {item.question}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-hair/70 text-ink-soft transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-sage bg-sage text-white"
                            : "group-hover:border-sage group-hover:text-sage",
                        )}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M8 2v12M2 8h12" />
                        </svg>
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="pb-9 pl-0 md:pl-0">
                        <p className="max-w-3xl text-[16px] leading-[1.75] text-ink-soft md:text-[17px]">
                          {item.answer}
                        </p>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
