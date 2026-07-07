type MarqueeProps = {
  items: string[];
};

/** Infinite scrolling strip of technology names. Pure CSS, flat colors. */
export function Marquee({ items }: MarqueeProps) {
  if (items.length === 0) return null;

  return (
    <div className="overflow-hidden border-b border-line bg-surface">
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-6 py-4 pl-6"
              >
                <span className="font-display text-lg font-medium uppercase tracking-tight">
                  {item}
                </span>
                <span className="text-accent" aria-hidden="true">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
