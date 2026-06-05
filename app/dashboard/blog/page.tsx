import type { Metadata } from "next";
import Link from "next/link";
import { listBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog & berichten",
  robots: { index: false, follow: false },
};

export default async function BlogListPage() {
  const posts = await listBlogPosts();

  return (
    <article className="px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 lg:px-20 lg:pt-20">
      {/* Header */}
      <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-sage/70" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-ink-muted">
              Blog & berichten
            </p>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] text-ink">
            Berichten van het{" "}
            <span className="italic text-sage">netwerk</span>.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-ink-soft md:text-[16px]">
            Mededelingen, nieuws en achtergrond — alles wat de partners
            onder elkaar willen delen.
          </p>
        </div>

        <Link
          href="/dashboard/blog/nieuw"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-white transition-colors hover:bg-sage"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14M12 5v14" />
          </svg>
          Nieuw bericht
        </Link>
      </header>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <p className="mt-12 text-[12px] uppercase tracking-[0.28em] text-ink-muted md:mt-16">
            {posts.length} bericht{posts.length === 1 ? "" : "en"}
          </p>

          <ul className="mt-6 divide-y divide-ink-hair/40 border-y border-ink-hair/40">
            {posts.map((p, idx) => {
              const authorName =
                p.author?.full_name ?? p.author?.company ?? "Renocheck partner";
              return (
                <li key={p.id}>
                  <Link
                    href={`/dashboard/blog/${p.id}`}
                    className="group grid gap-4 py-7 transition-colors hover:bg-surface-soft/40 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9"
                  >
                    {/* Date column */}
                    <div className="md:col-span-3">
                      <p className="font-display text-[12px] font-medium uppercase tracking-[0.24em] text-ink-muted tabular-nums">
                        <span className="text-sage">#{String(posts.length - idx).padStart(2, "0")}</span>{" "}
                        · {formatDate(p.created_at)}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-muted/70">
                        {authorName}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="min-w-0 md:col-span-8">
                      <h2 className="font-display text-[24px] font-medium leading-[1.15] text-ink transition-colors group-hover:text-sage md:text-[30px]">
                        {p.title}
                      </h2>
                      {p.excerpt ? (
                        <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                          {p.excerpt}
                        </p>
                      ) : null}
                    </div>

                    <div className="md:col-span-1 md:text-right">
                      <span className="text-ink-muted transition-colors group-hover:text-sage">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-ink-hair p-10 text-center md:mt-16 md:p-16">
      <span
        aria-hidden="true"
        className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 4v4h4" />
          <path d="M7 14h10M7 18h6" />
        </svg>
      </span>
      <p className="mt-6 font-display text-[28px] font-medium leading-[1.2] text-ink md:text-[34px]">
        Nog geen berichten.
      </p>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-ink-soft">
        Wees de eerste die iets deelt met het netwerk — een werfverslag,
        een event-recap, een waarschuwing over een wijziging.
      </p>
      <Link
        href="/dashboard/blog/nieuw"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white hover:bg-sage"
      >
        Bericht schrijven →
      </Link>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
