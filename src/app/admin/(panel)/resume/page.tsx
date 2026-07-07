import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { DeleteButton } from "@/components/admin/controls";
import { ResumeForm } from "@/components/admin/resume-form";
import {
  ArrowUpRight,
  DownloadIcon,
  FileTextIcon,
} from "@/components/ui/icons";
import { deleteResumeAction, uploadResumeAction } from "@/lib/actions/resume";
import { isDbConfigured } from "@/lib/db";
import { getResumeMeta } from "@/lib/services/resume";

export default async function AdminResumePage() {
  const meta = await getResumeMeta();
  const dbConnected = isDbConfigured();

  return (
    <>
      <AdminPageHeader
        title="Resume"
        description="Manage the PDF served by the Download button on /resume."
        action={
          <div className="flex gap-3">
            <Link href="/resume" target="_blank" className="btn btn-outline btn-sm">
              <ArrowUpRight size={13} /> View Page
            </Link>
            <a href="/api/resume" className="btn btn-outline btn-sm">
              <DownloadIcon size={13} /> Download Current
            </a>
          </div>
        }
      />

      <div className="space-y-8 p-6 md:p-8">
        {/* Current file */}
        <div className="rounded-xl border border-line bg-surface">
          <p className="label-mono border-b border-line px-5 py-4 !text-accent">
            Current File
          </p>
          <div className="flex flex-wrap items-center gap-4 p-5 md:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-line bg-paper text-muted">
              <FileTextIcon size={22} />
            </span>
            <div className="min-w-0 flex-1">
              {meta ? (
                <>
                  <p className="truncate text-sm font-medium">{meta.filename}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">
                    {Math.round(meta.size / 1024)} KB · uploaded{" "}
                    {meta.updatedAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · stored in NeonDB
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium">Muhammad-Ahmad-Resume.pdf</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">
                    bundled default · public/docs/ · replace it below
                  </p>
                </>
              )}
            </div>
            {meta && (
              <DeleteButton
                action={deleteResumeAction}
                confirmMessage="Remove the uploaded resume? The bundled default PDF will be served again."
                disabled={!dbConnected}
                label="Delete Upload"
              />
            )}
          </div>
        </div>

        {/* Upload / replace */}
        <div className="rounded-xl border border-line bg-surface p-5 md:p-6">
          <p className="label-mono mb-5 !text-accent">Upload New Resume</p>
          <ResumeForm action={uploadResumeAction} disabled={!dbConnected} />
        </div>

        {/* Where the page text lives */}
        <div className="rounded-xl border border-line bg-surface p-5 md:p-6">
          <p className="label-mono mb-3 !text-accent">Editing the Page Text</p>
          <p className="text-sm leading-relaxed text-muted">
            The written sections on{" "}
            <code className="font-mono text-ink">/resume</code> (summary,
            experience, education, skills) live in{" "}
            <code className="font-mono text-ink">
              src/lib/data/resume-data.ts
            </code>
            {" "}— edit that file to change the on-page text. The PDF you upload
            here only changes what visitors download.
          </p>
        </div>
      </div>
    </>
  );
}
