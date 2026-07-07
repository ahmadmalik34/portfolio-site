"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { projects, type Metric, type NewProject } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

export type ProjectFormState = { error?: string };

const DB_MISSING_ERROR =
  "Database not connected. Add DATABASE_URL to .env.local, run `npm run db:push` and `npm run db:seed`, then restart.";

function parseMetrics(raw: string): Metric[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, ...rest] = line.split("|");
      return { value: (value ?? "").trim(), label: rest.join("|").trim() };
    })
    .filter((metric) => metric.value && metric.label);
}

function parseStack(raw: string): string[] {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseProjectForm(
  formData: FormData,
): { data: Omit<NewProject, "id"> } | { error: string } {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) return { error: "Title is required." };
  if (!category) return { error: "Category is required." };
  if (!description) return { error: "Short description is required." };

  const slug = slugify(slugInput || title);
  if (!slug) return { error: "Slug could not be generated — set one manually." };

  const coverImage = String(formData.get("coverImage") ?? "").trim();
  if (coverImage.length > 900_000) {
    return { error: "Cover image is too large — keep uploads under ~600 KB." };
  }
  if (
    coverImage.startsWith("data:") &&
    !/^data:image\/(png|jpe?g|webp);base64,/.test(coverImage)
  ) {
    return { error: "Cover must be a PNG, JPG or WEBP image." };
  }

  const coverColorRaw = String(formData.get("coverColor") ?? "").trim();
  const coverColor = /^#[0-9a-fA-F]{6}$/.test(coverColorRaw)
    ? coverColorRaw.toLowerCase()
    : "#ff4d00";

  return {
    data: {
      slug,
      title,
      category,
      year: year || String(new Date().getFullYear()),
      role: String(formData.get("role") ?? "").trim() || "Full-Stack Developer",
      description,
      overview: String(formData.get("overview") ?? "").trim(),
      challenge: String(formData.get("challenge") ?? "").trim(),
      solution: String(formData.get("solution") ?? "").trim(),
      results: String(formData.get("results") ?? "").trim(),
      stack: parseStack(String(formData.get("stack") ?? "")),
      metrics: parseMetrics(String(formData.get("metrics") ?? "")),
      liveUrl: String(formData.get("liveUrl") ?? "").trim(),
      repoUrl: String(formData.get("repoUrl") ?? "").trim(),
      coverColor,
      coverImage,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
    },
  };
}

function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function createProjectAction(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await assertAdmin();
  const db = getDb();
  if (!db) return { error: DB_MISSING_ERROR };

  const parsed = parseProjectForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await db.insert(projects).values(parsed.data);
  } catch (error) {
    console.error("[admin] create project failed:", error);
    return { error: `Could not create project — is the slug "${parsed.data.slug}" already in use?` };
  }
  revalidateSite();
  redirect("/admin/projects");
}

export async function updateProjectAction(
  id: number,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await assertAdmin();
  const db = getDb();
  if (!db) return { error: DB_MISSING_ERROR };

  const parsed = parseProjectForm(formData);
  if ("error" in parsed) return parsed;

  try {
    await db
      .update(projects)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(projects.id, id));
  } catch (error) {
    console.error("[admin] update project failed:", error);
    return { error: `Could not save — is the slug "${parsed.data.slug}" already in use?` };
  }
  revalidateSite();
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: number) {
  await assertAdmin();
  const db = getDb();
  if (!db) return;
  await db.delete(projects).where(eq(projects.id, id));
  revalidateSite();
}
