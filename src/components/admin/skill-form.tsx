"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { TrashIcon } from "@/components/ui/icons";
import { TechIcon } from "@/components/ui/tech-icon";
import type { SkillFormState } from "@/lib/actions/skills";
import {
  SKILL_CATEGORY_LABELS,
  type Skill,
  type SkillCategory,
} from "@/lib/db/schema";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];
const MAX_FILE_BYTES = 300 * 1024; // 300 KB
const RASTER_MAX_DIMENSION = 128; // px — raster uploads are resized to this

type SkillFormProps = {
  action: (state: SkillFormState, formData: FormData) => Promise<SkillFormState>;
  skill?: Skill;
  disabled?: boolean;
  submitLabel: string;
  /** Inline variant used at the top of the skills list page. */
  compact?: boolean;
};

/** Downscale PNG/JPG to a small square-fit data URL; pass SVG through. */
async function fileToIconDataUrl(file: File): Promise<string> {
  const readAsDataUrl = () =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Could not read the file."));
      reader.readAsDataURL(file);
    });

  if (file.type === "image/svg+xml") {
    return readAsDataUrl();
  }

  const originalDataUrl = await readAsDataUrl();
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Not a valid image file."));
    img.src = originalDataUrl;
  });

  const scale = Math.min(
    1,
    RASTER_MAX_DIMENSION / Math.max(image.width, image.height),
  );
  if (scale === 1) return originalDataUrl;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const context = canvas.getContext("2d");
  if (!context) return originalDataUrl;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

export function SkillForm({
  action,
  skill,
  disabled,
  submitLabel,
  compact = false,
}: SkillFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [name, setName] = useState(skill?.name ?? "");
  const [category, setCategory] = useState<SkillCategory>(
    skill?.category ?? "web",
  );
  const [icon, setIcon] = useState(skill?.icon ?? "");
  const [sortOrder, setSortOrder] = useState(String(skill?.sortOrder ?? 0));
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset the inline "add" form after a successful create. All fields are
  // controlled, so we adjust state during render (the pattern from
  // react.dev "You might not need an effect") instead of using an effect.
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (compact && state.success) {
      setName("");
      setIcon("");
      setSortOrder("0");
      setUploadError("");
    }
  }

  const isUploadedIcon = icon.startsWith("data:");
  const fieldId = (field: string) => `${field}-${skill?.id ?? "new"}`;

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError("Only PNG, JPG or SVG images are allowed.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setUploadError(
        `Image is too large (${Math.round(file.size / 1024)} KB) — keep it under ${MAX_FILE_BYTES / 1024} KB.`,
      );
      return;
    }

    try {
      const dataUrl = await fileToIconDataUrl(file);
      setIcon(dataUrl);
      setUploadError("");
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Could not process the image.",
      );
    }
  }

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
      {state.success && compact && (
        <p
          role="status"
          className="mb-4 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-green"
        >
          {state.success}
        </p>
      )}

      <fieldset disabled={isPending || disabled} className="space-y-5">
        {/* Row 1 — name / category / order */}
        <div className="grid gap-4 sm:grid-cols-[1fr_200px_90px]">
          <div>
            <label className="field-label" htmlFor={fieldId("name")}>
              Name *
            </label>
            <input
              id={fieldId("name")}
              name="name"
              className="input"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. GraphQL"
            />
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId("category")}>
              Category
            </label>
            <select
              id={fieldId("category")}
              name="category"
              className="select"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as SkillCategory)
              }
            >
              {Object.entries(SKILL_CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor={fieldId("sortOrder")}>
              Order
            </label>
            <input
              id={fieldId("sortOrder")}
              name="sortOrder"
              type="number"
              className="input"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            />
          </div>
        </div>

        {/* Row 2 — icon: upload, slug or URL */}
        <div>
          <span className="field-label">Icon</span>
          <div className="flex flex-wrap items-center gap-3">
            {/* Live preview */}
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface">
              <TechIcon
                key={icon || name}
                icon={icon}
                name={name || "?"}
                size={24}
              />
            </span>

            {isUploadedIcon ? (
              <>
                <input type="hidden" name="icon" value={icon} />
                <span className="rounded-lg border border-line bg-paper px-3 py-2 font-mono text-xs text-green">
                  ✓ uploaded image ({Math.round((icon.length * 3) / 4 / 1024)}{" "}
                  KB)
                </span>
              </>
            ) : (
              <input
                id={fieldId("icon")}
                name="icon"
                className="input max-w-xs font-mono text-sm"
                value={icon}
                onChange={(event) => setIcon(event.target.value.trim())}
                placeholder="react · django · https://…/logo.svg"
              />
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="sr-only"
              onChange={handleFileChange}
              aria-label="Upload icon image"
            />
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploadedIcon ? "Change Upload" : "Upload Image"}
            </button>
            {icon && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  setIcon("");
                  setUploadError("");
                }}
              >
                <TrashIcon size={13} /> Remove Icon
              </button>
            )}
          </div>

          {uploadError && (
            <p role="alert" className="mt-2 text-xs text-accent">
              {uploadError}
            </p>
          )}
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Upload a PNG/JPG/SVG from your PC (max{" "}
            {MAX_FILE_BYTES / 1024} KB — raster images are auto-resized to{" "}
            {RASTER_MAX_DIMENSION}px), type a{" "}
            <a
              href="https://simpleicons.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-accent"
            >
              simple-icons
            </a>{" "}
            slug (e.g. <code className="font-mono">nextdotjs</code>), or paste
            an image URL. Leave empty for a monogram fallback.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-ink"
          >
            {isPending ? "Saving…" : submitLabel}
          </button>
          {!compact && (
            <Link href="/admin/skills" className="btn btn-outline">
              Cancel
            </Link>
          )}
        </div>
      </fieldset>
    </form>
  );
}
