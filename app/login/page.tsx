import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in op het Renocheck Professionals partnerportaal.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main id="main" className="relative flex min-h-screen flex-col lg:flex-row">
      {/* ---------- Visual side ---------- */}
      <aside
        aria-hidden="true"
        className="relative hidden overflow-hidden lg:flex lg:w-[50%] lg:flex-col lg:justify-end lg:p-14 xl:p-20"
      >
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/30" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-sage/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-[440px] w-[440px] rounded-full bg-sage/15 blur-3xl" />

        <div className="relative max-w-md text-white">
          <span
            aria-hidden="true"
            className="block h-px w-12 bg-sage-glow/80"
          />
          <blockquote className="mt-7 font-display text-[34px] font-medium leading-[1.15] xl:text-[42px]">
            Vakwerk is{" "}
            <span className="italic text-sage-glow">mensen</span>werk.
          </blockquote>
          <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.32em] text-white/75">
            Renocheck Professionals · Partnerportaal
          </p>
        </div>
      </aside>

      {/* ---------- Form side ---------- */}
      <section className="relative flex flex-1 flex-col px-6 py-8 sm:px-10 sm:py-12 lg:px-20 lg:py-14 xl:px-28">
        {/* Top bar: back link (left) + logo + Professionals (right) */}
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="enter-up delay-200 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.28em] text-ink-muted transition-colors hover:text-ink"
          >
            <svg
              viewBox="0 0 16 10"
              className="h-3 w-4 rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 5h14M11 1l4 4-4 4" />
            </svg>
            Terug naar de site
          </Link>

          <Link
            href="/"
            aria-label="Renocheck Professionals — home"
            className="enter-up delay-200 inline-flex flex-col items-start text-ink"
          >
            <Image
              src="/brand/renocheck-wordmark.png"
              alt="Renocheck"
              width={330}
              height={40}
              priority
              className="select-none"
            />
            <span
              className="mt-2.5 text-[10px] font-medium uppercase text-ink"
              style={{ letterSpacing: "0.4em", marginLeft: 50 }}
            >
              Professionals
            </span>
          </Link>
        </div>

        <div className="my-auto w-full max-w-md py-10 lg:py-16">
          <p className="enter-up delay-300 text-[11px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            Inloggen
          </p>
          <h1 className="enter-up delay-400 mt-4 font-display text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-[1.05] text-ink">
            Welkom{" "}
            <span className="italic text-sage">terug</span>.
          </h1>
          <p className="enter-up delay-500 mt-5 max-w-sm text-[15px] leading-[1.65] text-ink-soft">
            Log in op uw partner-account om uw blog en agenda bij te werken.
          </p>

          <div className="enter-up delay-600 mt-10">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>

          <p className="mt-10 border-t border-ink-hair/60 pt-8 text-[13px] text-ink-muted">
            Geen account?{" "}
            <Link
              href="/contact?subject=membership#contact-form"
              className="font-medium text-ink-soft underline-offset-4 transition-colors hover:text-sage hover:underline"
            >
              Vraag een partnerschap aan
            </Link>
            .
          </p>
        </div>

        {/* Bottom: copyright/footer note */}
        <p className="text-[11px] text-ink-muted">
          © {new Date().getFullYear()} Renocheck Professionals.
        </p>
      </section>
    </main>
  );
}
