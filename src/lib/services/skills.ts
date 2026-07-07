import { asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  skills,
  SKILL_CATEGORIES,
  type Skill,
  type SkillCategory,
} from "@/lib/db/schema";
import { demoSkills } from "@/lib/data/demo-data";

async function withFallback<T>(
  read: () => Promise<T>,
  fallback: () => T,
): Promise<T> {
  const db = getDb();
  if (!db) return fallback();
  try {
    return await read();
  } catch (error) {
    console.error("[db] read failed, serving demo data:", error);
    return fallback();
  }
}

export function getSkills(): Promise<Skill[]> {
  return withFallback(
    async () =>
      getDb()!
        .select()
        .from(skills)
        .orderBy(asc(skills.category), asc(skills.sortOrder), asc(skills.name)),
    () =>
      [...demoSkills].sort(
        (a, b) =>
          a.category.localeCompare(b.category) ||
          a.sortOrder - b.sortOrder ||
          a.name.localeCompare(b.name),
      ),
  );
}

export function getSkillById(id: number): Promise<Skill | null> {
  return withFallback(
    async () => {
      const rows = await getDb()!
        .select()
        .from(skills)
        .where(eq(skills.id, id))
        .limit(1);
      return rows[0] ?? null;
    },
    () => demoSkills.find((s) => s.id === id) ?? null,
  );
}

export type GroupedSkills = Array<{
  category: SkillCategory;
  items: Skill[];
}>;

/** Skills grouped by category, in the canonical category order. */
export async function getGroupedSkills(): Promise<GroupedSkills> {
  const all = await getSkills();
  return SKILL_CATEGORIES.map((category) => ({
    category,
    items: all
      .filter((s) => s.category === category)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)),
  })).filter((group) => group.items.length > 0);
}
