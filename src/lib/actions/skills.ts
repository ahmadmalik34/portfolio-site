"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import {
  skills,
  SKILL_CATEGORIES,
  type NewSkill,
  type SkillCategory,
} from "@/lib/db/schema";

export type SkillFormState = { error?: string; success?: string };

const DB_MISSING_ERROR =
  "Database not connected. Add DATABASE_URL to .env.local, run `npm run db:push` and `npm run db:seed`, then restart.";

// Uploaded icons arrive as base64 data URLs (~4/3 of the file size).
// 300 KB file cap on the client => ~420 KB string, leave headroom.
const MAX_ICON_LENGTH = 520_000;
const DATA_URL_PATTERN = /^data:image\/(png|jpe?g|svg\+xml);base64,/;

function parseSkillForm(
  formData: FormData,
): { data: Omit<NewSkill, "id"> } | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const categoryRaw = String(formData.get("category") ?? "web");
  const icon = String(formData.get("icon") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;

  if (!name) return { error: "Skill name is required." };

  if (icon.length > MAX_ICON_LENGTH) {
    return { error: "Icon image is too large — keep uploads under 300 KB." };
  }
  if (icon.startsWith("data:") && !DATA_URL_PATTERN.test(icon)) {
    return { error: "Only PNG, JPG or SVG image uploads are allowed." };
  }

  const category = (
    SKILL_CATEGORIES as readonly string[]
  ).includes(categoryRaw)
    ? (categoryRaw as SkillCategory)
    : "web";

  return { data: { name, category, icon, sortOrder } };
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function createSkillAction(
  _prev: SkillFormState,
  formData: FormData,
): Promise<SkillFormState> {
  await assertAdmin();
  const db = getDb();
  if (!db) return { error: DB_MISSING_ERROR };

  const parsed = parseSkillForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await db.insert(skills).values(parsed.data);
  } catch (error) {
    console.error("[admin] create skill failed:", error);
    return { error: "Could not add the skill. Check the values and try again." };
  }
  revalidateSite();
  return { success: `“${parsed.data.name}” added.` };
}

export async function updateSkillAction(
  id: number,
  _prev: SkillFormState,
  formData: FormData,
): Promise<SkillFormState> {
  await assertAdmin();
  const db = getDb();
  if (!db) return { error: DB_MISSING_ERROR };

  const parsed = parseSkillForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await db.update(skills).set(parsed.data).where(eq(skills.id, id));
  } catch (error) {
    console.error("[admin] update skill failed:", error);
    return { error: "Could not save the skill. Check the values and try again." };
  }
  revalidateSite();
  redirect("/admin/skills");
}

export async function deleteSkillAction(id: number) {
  await assertAdmin();
  const db = getDb();
  if (!db) return;
  await db.delete(skills).where(eq(skills.id, id));
  revalidateSite();
}
