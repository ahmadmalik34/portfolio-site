"use server";

import { redirect } from "next/navigation";
import {
  checkPassword,
  createSession,
  destroySession,
} from "@/lib/auth/session";

export type AuthState = { error?: string };

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  if (!password) {
    return { error: "Enter your password." };
  }
  if (!checkPassword(password)) {
    return { error: "Incorrect password. Try again." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
