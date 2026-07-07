"use server";

import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { resume } from "@/lib/db/schema";

export type ResumeFormState = { error?: string; success?: string };

const DB_MISSING_ERROR =
  "Database not connected. Add DATABASE_URL to .env.local, run `npm run db:push`, then restart.";

const MAX_PDF_BYTES = 4 * 1024 * 1024; // 4 MB

export async function uploadResumeAction(
  _prev: ResumeFormState,
  formData: FormData,
): Promise<ResumeFormState> {
  await assertAdmin();
  const db = getDb();
  if (!db) return { error: DB_MISSING_ERROR };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a PDF file first." };
  }
  if (file.type !== "application/pdf") {
    return { error: "Only PDF files are allowed." };
  }
  if (file.size > MAX_PDF_BYTES) {
    return {
      error: `PDF is too large (${(file.size / 1024 / 1024).toFixed(1)} MB) — keep it under 4 MB.`,
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName =
    file.name.replace(/[^\w.\- ]+/g, "").slice(0, 80) || "resume.pdf";

  try {
    await db.delete(resume); // single-row table: replace whatever is there
    await db.insert(resume).values({
      filename: safeName,
      data: buffer.toString("base64"),
      size: file.size,
    });
  } catch (error) {
    console.error("[admin] resume upload failed:", error);
    return { error: "Could not save the resume. Try again." };
  }

  revalidatePath("/", "layout");
  return {
    success: `Uploaded “${safeName}” (${Math.round(file.size / 1024)} KB). The download button now serves this file.`,
  };
}

export async function deleteResumeAction() {
  await assertAdmin();
  const db = getDb();
  if (!db) return;
  await db.delete(resume);
  revalidatePath("/", "layout");
}
