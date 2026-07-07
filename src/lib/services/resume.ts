import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { resume, type ResumeRow } from "@/lib/db/schema";

export type ResumeMeta = {
  filename: string;
  size: number;
  updatedAt: Date;
};

/** Metadata of the admin-uploaded resume, without the heavy base64 payload. */
export async function getResumeMeta(): Promise<ResumeMeta | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db
      .select({
        filename: resume.filename,
        size: resume.size,
        updatedAt: resume.updatedAt,
      })
      .from(resume)
      .orderBy(desc(resume.updatedAt))
      .limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.error("[db] resume meta read failed:", error);
    return null;
  }
}

/** Full uploaded resume (base64 payload included) for the download route. */
export async function getResumeFile(): Promise<ResumeRow | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db
      .select()
      .from(resume)
      .orderBy(desc(resume.updatedAt))
      .limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.error("[db] resume read failed:", error);
    return null;
  }
}
