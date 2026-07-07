import { asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { projects, type Project } from "@/lib/db/schema";
import { demoProjects } from "@/lib/data/demo-data";

function demoSorted() {
  return [...demoProjects].sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Run a DB read, falling back to demo data on missing config or errors. */
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

export function getPublishedProjects(): Promise<Project[]> {
  return withFallback(
    async () =>
      getDb()!
        .select()
        .from(projects)
        .where(eq(projects.published, true))
        .orderBy(asc(projects.sortOrder), desc(projects.year)),
    () => demoSorted().filter((p) => p.published),
  );
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const all = await getPublishedProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export function getProjectBySlug(slug: string): Promise<Project | null> {
  return withFallback(
    async () => {
      const rows = await getDb()!
        .select()
        .from(projects)
        .where(eq(projects.slug, slug))
        .limit(1);
      return rows[0] ?? null;
    },
    () => demoProjects.find((p) => p.slug === slug) ?? null,
  );
}

/** Previous/next published projects relative to `slug` (for case-study nav). */
export async function getAdjacentProjects(slug: string) {
  const all = await getPublishedProjects();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

/* ----------------- admin reads ----------------- */

export function getAllProjects(): Promise<Project[]> {
  return withFallback(
    async () =>
      getDb()!.select().from(projects).orderBy(asc(projects.sortOrder)),
    () => demoSorted(),
  );
}

export function getProjectById(id: number): Promise<Project | null> {
  return withFallback(
    async () => {
      const rows = await getDb()!
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1);
      return rows[0] ?? null;
    },
    () => demoProjects.find((p) => p.id === id) ?? null,
  );
}
