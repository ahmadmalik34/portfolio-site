import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  number: string;
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
};

export function SectionHeading({
  number,
  eyebrow,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <p className="label-mono">
          <span className="text-accent">{number}</span>
          <span className="mx-3 text-line">/</span>
          {eyebrow}
        </p>
        {action}
      </div>
      <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl md:mt-8 md:text-6xl">
        {title}
      </h2>
      {/* Accent rule that draws itself on reveal */}
      <span
        className="grow-line mt-5 block h-[3px] w-20 bg-accent md:w-24"
        aria-hidden="true"
      />
    </Reveal>
  );
}
