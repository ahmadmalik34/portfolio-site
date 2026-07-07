"use client";

import { useState } from "react";
import { cx } from "@/lib/utils";

type CoverMediaProps = {
  /** Photo URL or uploaded data URL. Empty -> flat color fallback. */
  image?: string;
  /** Fallback color, always painted underneath. */
  color: string;
  /** Slow zoom when a parent with the `group` class is hovered. */
  zoomOnGroupHover?: boolean;
  className?: string;
};

/**
 * Absolute-fill project cover: photo with graceful fallback to the flat
 * cover color, plus a soft inner black vignette around the edges.
 */
export function CoverMedia({
  image,
  color,
  zoomOnGroupHover = false,
  className,
}: CoverMediaProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(image) && !failed;

  return (
    <div
      aria-hidden="true"
      className={cx("absolute inset-0 overflow-hidden", className)}
      style={{ backgroundColor: color }}
    >
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element -- covers come from arbitrary URLs/data URLs managed in the admin
        <img
          src={image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className={cx(
            "absolute inset-0 h-full w-full object-cover",
            zoomOnGroupHover &&
              "transition-transform duration-700 group-hover:scale-105",
          )}
        />
      )}
      {/* soft dark edges (inner vignette) */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_64px_18px_rgba(0,0,0,0.55)]" />
    </div>
  );
}
