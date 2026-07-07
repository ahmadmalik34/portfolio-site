"use client";

import Link from "next/link";
import { TrashIcon } from "@/components/ui/icons";
import { useActionState, useRef, useState } from "react";
import type { Project } from "@/lib/db/schema";
import type { ProjectFormState } from "@/lib/actions/projects";
import { slugify } from "@/lib/utils";

const COVER_PRESETS = [
  "#ff4d00",
  "#2757f5",
  "#0b7a45",
  "#6d28d9",
  "#475569",
  "#b91c1c",
] as const;

type ProjectFormProps = {
  action: (
    state: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  project?: Project;
  disabled?: boolean;
  submitLabel: string;
};

export function ProjectForm({
  action,
  project,
  disabled,
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [coverColor, setCoverColor] = useState(
    project?.coverColor ?? COVER_PRESETS[0],
  );
  const [coverImage, setCoverImage] = useState(project?.coverImage ?? "");
  const [coverError, setCoverError] = useState("");
  const coverFileRef = useRef<HTMLInputElement>(null);

  const effectiveSlug = slugTouched ? slug : slugify(title);
  const isUploadedCover = coverImage.startsWith("data:");

  async function handleCoverFile(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setCoverError("Only PNG, JPG or WEBP images are allowed.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setCoverError("Image is too large — keep it under 4 MB.");
      return;
    }
    try {
      const originalUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Could not read the file."));
        reader.readAsDataURL(file);
      });
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Not a valid image file."));
        img.src = originalUrl;
      });
      const scale = Math.min(1, 1280 / image.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not process the image.");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
      if (dataUrl.length > 900_000) {
        setCoverError("Image is still too large after resizing — try a smaller one.");
        return;
      }
      setCoverImage(dataUrl);
      setCoverError("");
    } catch (error) {
      setCoverError(
        error instanceof Error ? error.message : "Could not process the image.",
      );
    }
  }

  return (
    <form action={formAction} className="max-w-3xl">
      {state.error && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-accent bg-surface px-4 py-3 text-sm text-accent-deep"
        >
          {state.error}
        </p>
      )}

      <fieldset disabled={isPending} className="space-y-6">
        {/* Basics */}
        <div className="rounded-xl border border-line bg-surface p-5 md:p-6">
          <p className="label-mono mb-5 !text-accent">Basics</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="title">
                Title *
              </label>
              <input
                id="title"
                name="title"
                className="input"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Project name"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="slug">
                Slug (URL)
              </label>
              <input
                id="slug"
                name="slug"
                className="input font-mono text-sm"
                value={effectiveSlug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(slugify(event.target.value));
                }}
                placeholder="auto-generated-from-title"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="category">
                Category *
              </label>
              <input
                id="category"
                name="category"
                className="input"
                required
                defaultValue={project?.category ?? ""}
                placeholder="Full-Stack · E-Commerce"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="field-label" htmlFor="year">
                  Year
                </label>
                <input
                  id="year"
                  name="year"
                  className="input"
                  defaultValue={project?.year ?? String(new Date().getFullYear())}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="sortOrder">
                  Sort Order
                </label>
                <input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  className="input"
                  defaultValue={project?.sortOrder ?? 0}
                />
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="role">
                Your Role
              </label>
              <input
                id="role"
                name="role"
                className="input"
                defaultValue={project?.role ?? "Full-Stack Developer"}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="stack">
                Stack (comma-separated)
              </label>
              <input
                id="stack"
                name="stack"
                className="input"
                defaultValue={project?.stack.join(", ") ?? ""}
                placeholder="Next.js, Django REST Framework, PostgreSQL"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label" htmlFor="description">
              Short Description * (card + meta text)
            </label>
            <textarea
              id="description"
              name="description"
              className="textarea"
              required
              rows={2}
              defaultValue={project?.description ?? ""}
              placeholder="One or two sentences shown on the project card."
            />
          </div>
        </div>

        {/* Case study */}
        <div className="rounded-xl border border-line bg-surface p-5 md:p-6">
          <p className="label-mono mb-5 !text-accent">
            Case Study (shown on the detail page)
          </p>
          <div className="space-y-5">
            {(
              [
                ["overview", "Overview"],
                ["challenge", "The Challenge"],
                ["solution", "The Solution"],
                ["results", "The Results"],
              ] as const
            ).map(([name, label]) => (
              <div key={name}>
                <label className="field-label" htmlFor={name}>
                  {label}
                </label>
                <textarea
                  id={name}
                  name={name}
                  className="textarea"
                  defaultValue={project?.[name] ?? ""}
                />
              </div>
            ))}
            <div>
              <label className="field-label" htmlFor="metrics">
                Result Metrics — one per line, format:{" "}
                <span className="normal-case">value | label</span>
              </label>
              <textarea
                id="metrics"
                name="metrics"
                className="textarea font-mono text-sm"
                rows={3}
                defaultValue={
                  project?.metrics
                    .map((metric) => `${metric.value} | ${metric.label}`)
                    .join("\n") ?? ""
                }
                placeholder={"+38% | Conversion rate\n0.8s | Page load time"}
              />
            </div>
          </div>
        </div>

        {/* Presentation */}
        <div className="rounded-xl border border-line bg-surface p-5 md:p-6">
          <p className="label-mono mb-5 !text-accent">Presentation</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="liveUrl">
                Live URL
              </label>
              <input
                id="liveUrl"
                name="liveUrl"
                type="url"
                className="input"
                defaultValue={project?.liveUrl ?? ""}
                placeholder="https://…"
              />
            </div>
            <div>
              <label className="field-label" htmlFor="repoUrl">
                Repository URL
              </label>
              <input
                id="repoUrl"
                name="repoUrl"
                type="url"
                className="input"
                defaultValue={project?.repoUrl ?? ""}
                placeholder="https://github.com/…"
              />
            </div>
          </div>

          <div className="mt-5">
            <span className="field-label">
              Cover Image (cards & case-study banner)
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {isUploadedCover ? (
                <>
                  <input type="hidden" name="coverImage" value={coverImage} />
                  <span className="rounded-lg border border-line bg-paper px-3 py-2 font-mono text-xs text-green">
                    ✓ uploaded image (
                    {Math.round((coverImage.length * 3) / 4 / 1024)} KB)
                  </span>
                </>
              ) : (
                <input
                  name="coverImage"
                  className="input max-w-md font-mono text-sm"
                  value={coverImage}
                  onChange={(event) =>
                    setCoverImage(event.target.value.trim())
                  }
                  placeholder="https://… or upload from your PC →"
                />
              )}
              <input
                ref={coverFileRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                aria-label="Upload cover image"
                onChange={handleCoverFile}
              />
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => coverFileRef.current?.click()}
              >
                {isUploadedCover ? "Change Upload" : "Upload Image"}
              </button>
              {coverImage && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setCoverImage("");
                    setCoverError("");
                  }}
                >
                  <TrashIcon size={13} /> Remove
                </button>
              )}
            </div>
            {coverError && (
              <p role="alert" className="mt-2 text-xs text-accent">
                {coverError}
              </p>
            )}
            <p className="mt-2 text-xs text-muted">
              PNG/JPG/WEBP — uploads are resized to 1280px (≈600 KB max,
              stored in NeonDB). Leave empty to use the flat cover color
              below.
            </p>
          </div>

          <div className="mt-5">
            <span className="field-label">
              Cover Color (fallback when no image)
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {COVER_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-label={`Use ${preset}`}
                  onClick={() => setCoverColor(preset)}
                  className="size-9 border"
                  style={{
                    backgroundColor: preset,
                    borderColor:
                      coverColor === preset ? "var(--ink)" : "var(--line)",
                    outline:
                      coverColor === preset
                        ? "2px solid var(--ink)"
                        : undefined,
                    outlineOffset: 2,
                  }}
                />
              ))}
              <input
                type="color"
                aria-label="Custom cover color"
                value={coverColor}
                onChange={(event) => setCoverColor(event.target.value)}
                className="h-9 w-14 cursor-pointer rounded-xl border border-line bg-surface p-1"
              />
              <input
                type="hidden"
                name="coverColor"
                value={coverColor}
              />
              <span className="font-mono text-xs text-muted">{coverColor}</span>
            </div>
            {/* Live cover preview */}
            <div
              className="relative mt-4 flex aspect-[16/6] items-end overflow-hidden rounded-lg p-4"
              style={{ backgroundColor: coverColor }}
            >
              {coverImage && (
                // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary URL/data URL
                <img
                  src={coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_48px_14px_rgba(0,0,0,0.55)]" />
              <span className="relative z-10 font-display text-2xl font-bold uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {title || "Project Title"}
              </span>
              <span className="absolute -bottom-4 right-2 font-display text-7xl font-bold text-white/15">
                01
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-8">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project?.featured ?? false}
                className="size-4 accent-[var(--accent)]"
              />
              Featured on homepage
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
              <input
                type="checkbox"
                name="published"
                defaultChecked={project?.published ?? true}
                className="size-4 accent-[var(--accent)]"
              />
              Published (visible on site)
            </label>
          </div>
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-ink"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
        <Link href="/admin/projects" className="btn btn-outline">
          Cancel
        </Link>
        {disabled && (
          <p className="w-full text-xs text-muted">
            Demo mode — connect DATABASE_URL to save changes.
          </p>
        )}
      </div>
    </form>
  );
}
