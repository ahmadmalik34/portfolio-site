"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** e.g. "12+", "03+", "0.91", "-63%", "4M" — the numeric part animates. */
  value: string;
  duration?: number;
  className?: string;
};

const NUMBER_PATTERN = /^(.*?)(\d+(?:\.\d+)?)(.*)$/;

/** Counts the numeric part of a stat up from zero when scrolled into view. */
export function CountUp({ value, duration = 1400, className }: CountUpProps) {
  const match = value.match(NUMBER_PATTERN);
  const [display, setDisplay] = useState(match ? "0" : value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parsed = value.match(NUMBER_PATTERN);
    const element = ref.current;
    if (!parsed || !element) return;

    const target = parseFloat(parsed[2]);
    const decimals = (parsed[2].split(".")[1] ?? "").length;
    // Preserve leading zeros ("03+" animates 00 → 03).
    const padTo =
      decimals === 0 && parsed[2].startsWith("0") ? parsed[2].length : 0;
    const format = (n: number) => {
      let text = n.toFixed(decimals);
      if (padTo) text = text.padStart(padTo, "0");
      return text;
    };

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(format(target));
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(format(target * eased));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}
