import { promises as fs } from "fs";
import path from "path";
import { getResumeFile } from "@/lib/services/resume";

export const dynamic = "force-dynamic";

const FALLBACK_FILENAME = "Muhammad-Ahmad-Resume.pdf";

/** Exact-length ArrayBuffer from a (possibly pooled) Node Buffer. */
function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

function pdfResponse(buffer: Buffer, filename: string) {
  return new Response(toArrayBuffer(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": "no-store",
    },
  });
}

/**
 * Serves the resume PDF: the admin-uploaded version from NeonDB when one
 * exists, otherwise the bundled file in public/docs.
 */
export async function GET() {
  const uploaded = await getResumeFile();
  if (uploaded) {
    return pdfResponse(Buffer.from(uploaded.data, "base64"), uploaded.filename);
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "docs",
      FALLBACK_FILENAME,
    );
    const buffer = await fs.readFile(filePath);
    return pdfResponse(buffer, FALLBACK_FILENAME);
  } catch (error) {
    console.error("[api] bundled resume missing:", error);
    return new Response("Resume not found.", { status: 404 });
  }
}
