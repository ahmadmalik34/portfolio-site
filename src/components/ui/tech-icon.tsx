"use client";

import { useState } from "react";
import { cx, initials } from "@/lib/utils";

type TechIconProps = {
  /** simple-icons slug (e.g. "react"), a full image URL, or an uploaded data URL. */
  icon: string;
  name: string;
  size?: number;
  className?: string;
};

function iconSrc(icon: string) {
  // Uploaded images and remote URLs are used as-is.
  if (/^(https?:|data:)/i.test(icon)) return icon;
  // simple-icons slug — force a light monochrome variant for the dark theme,
  // unless the user already specified a color ("react/61dafb").
  return icon.includes("/")
    ? `https://cdn.simple-icons.org/${icon}`
    : `https://cdn.simple-icons.org/${icon}/f1f1ec`;
}

/**
 * Renders a technology logo from a simple-icons slug, a custom URL, or an
 * uploaded image. Falls back to a typographic monogram when no icon is set
 * or it fails to load — the UI never shows a broken image.
 */
export function TechIcon({ icon, name, size = 24, className }: TechIconProps) {
  const [failed, setFailed] = useState(false);

  if (!icon || failed) {
    return (
      <span
        aria-hidden="true"
        className={cx(
          "grid shrink-0 select-none place-items-center rounded-lg border border-line bg-paper font-mono font-semibold text-muted",
          className,
        )}
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {initials(name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny icons (SVG/data URLs); next/image adds nothing here
    <img
      src={iconSrc(icon)}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      className={cx("shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}
