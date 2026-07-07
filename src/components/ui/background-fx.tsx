/**
 * Ambient, always-on background: a slowly drifting dot grid plus a few
 * floating code/data glyphs at whisper-low opacity. Pure CSS animation,
 * pointer-transparent, and disabled for prefers-reduced-motion.
 */
const GLYPHS = [
  { text: "</>", left: "6%", top: "16%", size: "2.6rem", duration: "13s", delay: "0s", accent: false },
  { text: "{ }", left: "88%", top: "12%", size: "2.2rem", duration: "16s", delay: "-4s", accent: true },
  { text: "=>", left: "78%", top: "44%", size: "2rem", duration: "11s", delay: "-2s", accent: false },
  { text: "01", left: "12%", top: "58%", size: "2.4rem", duration: "16s", delay: "-7s", accent: false },
  { text: "∑", left: "48%", top: "22%", size: "2.8rem", duration: "14s", delay: "-5s", accent: false },
  { text: "df", left: "90%", top: "74%", size: "2rem", duration: "12s", delay: "-3s", accent: false },
  { text: "( )", left: "28%", top: "84%", size: "2.2rem", duration: "17s", delay: "-9s", accent: true },
  { text: "#", left: "62%", top: "68%", size: "2.4rem", duration: "15s", delay: "-6s", accent: false },
] as const;

export function BackgroundFx() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="bg-dots" />
      {GLYPHS.map((glyph) => (
        <span
          key={`${glyph.text}-${glyph.left}`}
          className={
            glyph.accent ? "bgfx-glyph bgfx-glyph-accent" : "bgfx-glyph"
          }
          style={{
            left: glyph.left,
            top: glyph.top,
            fontSize: glyph.size,
            animationDuration: glyph.duration,
            animationDelay: glyph.delay,
          }}
        >
          {glyph.text}
        </span>
      ))}
    </div>
  );
}
