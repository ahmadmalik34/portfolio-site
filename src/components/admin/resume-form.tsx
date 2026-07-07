"use client";

import { useActionState, useRef, useState } from "react";
import { DownloadIcon } from "@/components/ui/icons";
import type { ResumeFormState } from "@/lib/actions/resume";

type ResumeFormProps = {
  action: (
    state: ResumeFormState,
    formData: FormData,
  ) => Promise<ResumeFormState>;
  disabled?: boolean;
};

export function ResumeForm({ action, disabled }: ResumeFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [selectedName, setSelectedName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={formAction}>
      {state.error && (
        <p
          role="alert"
          className="mb-4 rounded-lg border border-accent bg-surface px-4 py-3 text-sm text-accent"
        >
          {state.error}
        </p>
      )}
      {state.success && (
        <p
          role="status"
          className="mb-4 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-green"
        >
          {state.success}
        </p>
      )}

      <fieldset disabled={isPending} className="flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept="application/pdf"
          className="sr-only"
          aria-label="Choose resume PDF"
          onChange={(event) =>
            setSelectedName(event.target.files?.[0]?.name ?? "")
          }
        />
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose PDF
        </button>
        <span className="font-mono text-xs text-muted">
          {selectedName || "No file selected"}
        </span>
        <button
          type="submit"
          disabled={isPending || !selectedName}
          className="btn btn-ink btn-sm"
        >
          <DownloadIcon size={13} className="rotate-180" />
          {isPending ? "Uploading…" : "Upload & Replace"}
        </button>
      </fieldset>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        PDF only, max 4 MB. The file is stored in NeonDB, so replacing it works
        on Vercel without redeploying.
        {disabled && " Demo mode — connect DATABASE_URL to enable uploads."}
      </p>
    </form>
  );
}
