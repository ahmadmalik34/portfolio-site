import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Project } from "@/lib/db/schema";

type FeaturedWorkProps = {
  projects: Project[];
};

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section id="work" className="scroll-mt-16 border-b border-line">
      <div className="container-x py-16 md:py-24">
        <SectionHeading
          number="01"
          eyebrow="Selected Work"
          title="Featured Projects"
          action={
            <Link
              href="/work"
              className="label-mono group hidden items-center gap-2 !text-ink transition-colors hover:!text-accent sm:inline-flex"
            >
              All Projects
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 90}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 sm:hidden">
          <Link href="/work" className="btn btn-outline w-full">
            All Projects <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
