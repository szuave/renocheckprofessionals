"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { loginAction, type LoginState } from "./actions";

const INITIAL: LoginState = { error: null };

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [state, formAction] = useActionState(loginAction, INITIAL);

  return (
    <form action={formAction} aria-label="Login formulier" className="space-y-5">
      <input type="hidden" name="next" value={next} />

      <Field
        id="email"
        name="email"
        label="E-mailadres"
        type="email"
        autoComplete="email"
        placeholder="u@bedrijf.be"
        required
      />
      <Field
        id="password"
        name="password"
        label="Wachtwoord"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />

      {state.error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-300/60 bg-red-50/70 px-4 py-3 text-[13px] text-red-800"
        >
          {state.error}
        </div>
      ) : null}

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="group inline-flex w-full items-center justify-between gap-3 rounded-2xl bg-ink px-6 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-sage hover:shadow-[0_6px_20px_-8px_rgba(82,106,89,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span>{pending ? "Bezig met inloggen…" : "Log in"}</span>
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <svg
          viewBox="0 0 16 10"
          className="h-3 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 5h14M11 1l4 4-4 4" />
        </svg>
      </span>
    </button>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="mt-2.5 w-full rounded-xl border border-ink-hair/70 bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-muted/50 transition-colors focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
      />
    </div>
  );
}
