import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { padIndex } from "@/lib/utils";

const FACTS = [
  { label: "Location", value: siteConfig.location },
  { label: "Timezone", value: siteConfig.timezone },
  { label: "Focus", value: "Full-Stack & Data" },
  { label: "Status", value: "Open to work" },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 border-b border-line">
      <div className="container-x py-16 md:py-24">
        <SectionHeading number="03" eyebrow="About" title="Behind the Code" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-10 rounded-xl border border-line bg-surface p-6 md:p-8">
              <p className="max-w-2xl font-display text-xl font-medium leading-relaxed tracking-tight md:text-2xl">
                I build web products end-to-end: designing PostgreSQL schemas,
                shipping Django REST APIs, and crafting React &amp; Next.js
                interfaces that feel instant. When a problem hides in the data,
                I switch hats — Pandas for the pipelines, PyTorch for the
                models.
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-muted">
                What I care about: correct APIs over clever ones, measured
                performance over guessed performance, and interfaces that stay
                out of the user&apos;s way. Every project on this site — and this
                site itself — follows those rules.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <dl className="grid h-full grid-cols-2 divide-x divide-y divide-line rounded-xl border border-line bg-surface">
              {FACTS.map((fact) => (
                <div key={fact.label} className="p-5 [&:nth-child(3)]:!border-l-0">
                  <dt className="label-mono">{fact.label}</dt>
                  <dd className="mt-2 font-display text-base font-bold uppercase tracking-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Services */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.services.map((service, index) => (
            <Reveal key={service.title} delay={index * 70}>
              <div className="group h-full rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink">
                <p className="font-mono text-xs text-accent">
                  {padIndex(index)}
                </p>
                <h3 className="mt-4 font-display text-lg font-bold uppercase leading-tight tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
