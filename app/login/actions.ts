"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";

export type LoginState = { error: string | null };

function safeNext(raw: string | null): string {
  if (!raw) return "/dashboard";
  if (!raw.startsWith("/")) return "/dashboard";
  if (raw.startsWith("//")) return "/dashboard";
  return raw;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "") || null);

  if (!email || !password) {
    return { error: "Vul e-mailadres en wachtwoord in." };
  }

  const result = await signIn(email, password);
  if (!result.ok) {
    return { error: "Ongeldig e-mailadres of wachtwoord." };
  }

  redirect(next);
}

export async function logoutAction() {
  await signOut();
  redirect("/login");
}
