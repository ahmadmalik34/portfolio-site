/** Join class names, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** URL-safe slug from an arbitrary title. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Up to two initials, e.g. "Django REST Framework" -> "DR". */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

/** Zero-padded index, e.g. 0 -> "01". */
export function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}
