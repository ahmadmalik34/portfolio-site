"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { cx } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/work", label: "All Projects" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    // NOTE: no backdrop-filter here — it would create a containing block and
    // break the fixed-position mobile menu below. Solid bg keeps it correct.
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="container-x flex h-14 items-center justify-between sm:h-16 md:h-[72px]">
        <Link
          href="/"
          className="font-display text-base font-bold uppercase tracking-tight sm:text-lg md:text-xl"
          onClick={() => setMenuOpen(false)}
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-6 md:flex lg:gap-8"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link label-mono !text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-accent btn-sm">
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid size-9 place-items-center rounded-xl border border-line bg-surface transition-colors hover:border-accent sm:size-10 md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      {/* Mobile menu — solid, opaque, fills the viewport below the bar */}
      <div
        className={cx(
          "fixed inset-x-0 top-14 bottom-0 z-40 flex-col justify-between overflow-y-auto overscroll-contain bg-paper sm:top-16 md:hidden",
          menuOpen ? "flex" : "hidden",
        )}
      >
        <nav
          className="container-x flex flex-col divide-y divide-line border-b border-line"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-4 py-5 font-display text-2xl font-bold uppercase tracking-tight transition-colors hover:text-accent sm:text-3xl"
            >
              <span className="font-mono text-xs text-accent">
                0{index + 1}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="container-x py-8">
          <p className="label-mono mb-4">
            {siteConfig.location} · {siteConfig.timezone}
          </p>
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-accent w-full"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
