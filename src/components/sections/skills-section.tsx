import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";
import { SKILL_CATEGORY_LABELS } from "@/lib/db/schema";
import type { GroupedSkills } from "@/lib/services/skills";

type SkillsSectionProps = {
  groups: GroupedSkills;
};

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section id="skills" className="scroll-mt-16 border-b border-line">
      <div className="container-x py-16 md:py-24">
        <SectionHeading
          number="02"
          eyebrow="Capabilities"
          title="Tech Stack"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 90}>
              <div className="h-full rounded-xl border border-line bg-surface">
                <h3 className="flex items-baseline justify-between border-b border-line px-5 py-4">
                  <span className="font-display text-lg font-bold uppercase tracking-tight">
                    {SKILL_CATEGORY_LABELS[group.category]}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </h3>
                <ul className="divide-y divide-line">
                  {group.items.map((skill) => (
                    <li
                      key={skill.id}
                      className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-paper"
                    >
                      <TechIcon icon={skill.icon} name={skill.name} size={22} />
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span
                        aria-hidden="true"
                        className="ml-auto size-1.5 bg-line transition-colors group-hover:bg-accent"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
