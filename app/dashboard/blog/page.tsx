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
      <header className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[14px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            Blog & berichten
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] text-ink">
            Berichten van het{" "}
            <span className="italic text-sage">netwerk</span>.
          </h1>
        </div>
        <Link
          href="/dashboard/blog/nieuw"
          className="inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-sage"
        >
          + Nieuw bericht schrijven
        </Link>
      </header>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="mt-12 space-y-4 md:mt-16">
          {posts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/dashboard/blog/${p.id}`}
                className="group flex flex-col gap-3 rounded-2xl border border-ink-hair/60 bg-surface-soft/30 p-6 transition-colors hover:border-sage hover:bg-surface-soft/70 md:flex-row md:items-baseline md:gap-8 md:p-8"
              >
                <div className="md:w-40 md:shrink-0">
                  <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted">
                    {formatDate(p.created_at)}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-[24px] font-medium leading-[1.2] text-ink transition-colors group-hover:text-sage md:text-[28px]">
                    {p.title}
                  </h2>
                  {p.excerpt ? (
                    <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">
                      {p.excerpt}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[13px] text-ink-muted">
                    Door{" "}
                    {p.author?.full_name ??
                      p.author?.company ??
                      "Renocheck partner"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-ink-hair p-10 text-center md:mt-16 md:p-16">
      <p className="font-display text-[28px] font-medium leading-[1.2] text-ink md:text-[34px]">
        Nog geen berichten.
      </p>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-ink-soft">
        Wees de eerste partner die iets deelt. Klik hierboven op "Nieuw
        bericht schrijven" om te beginnen.
      </p>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
