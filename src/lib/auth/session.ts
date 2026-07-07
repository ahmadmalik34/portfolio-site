import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "am_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export const DEFAULT_ADMIN_PASSWORD = "admin123";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

export function isUsingDefaultPassword() {
  return !process.env.ADMIN_PASSWORD;
}

function secret() {
  return process.env.AUTH_SECRET || `am-portfolio::${adminPassword()}`;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

export function checkPassword(candidate: string) {
  return safeEqual(candidate, adminPassword());
}

export async function createSession() {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const value = `${expiresAt}.${sign(String(expiresAt))}`;
  const store = await cookies();
  store.set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function verifySession(): Promise<boolean> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const [expiresAt, signature] = raw.split(".");
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return safeEqual(signature, sign(expiresAt));
}

/** Redirects to the login page unless a valid admin session exists. */
export async function requireAdmin() {
  if (!(await verifySession())) {
    redirect("/admin/login");
  }
}

/** For server actions: throws instead of redirecting. */
export async function assertAdmin() {
  if (!(await verifySession())) {
    throw new Error("Unauthorized");
  }
}
