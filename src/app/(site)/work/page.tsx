import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { getPublishedProjects } from "@/lib/services/projects";
import { padIndex } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "Selected work — full-stack web applications, analytics platforms and machine-learning systems.",
};

export default async function WorkIndexPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="border-b border-line">
      <div className="container-x py-16 md:py-24">
        <Reveal>
          <p className="label-mono">
            <span className="text-accent">Index</span>
            <span className="mx-3 text-line">/</span>
            {String(projects.length).padStart(2, "0")} Projects
          </p>
          <h1 className="mt-8 font-display text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl">
            All Work
          </h1>
        </Reveal>

        {/* Editorial index rows */}
        <div className="mt-12 rounded-xl border border-line bg-surface">
          {/* Header row */}
          <div className="hidden grid-cols-[3.5rem_1.5fr_1fr_5rem_3rem] gap-4 border-b border-line px-5 py-3 md:grid">
            {["No.", "Project", "Category", "Year", ""].map((column, i) => (
              <span key={i} className="label-mono">
                {column}
              </span>
            ))}
          </div>

          {projects.map((project, index) => (
            <Reveal key={project.id}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-[3.5rem_1fr_3rem] items-center gap-4 border-b border-line px-5 py-6 transition-colors last:border-b-0 hover:bg-paper md:grid-cols-[3.5rem_1.5fr_1fr_5rem_3rem]"
              >
                <span className="font-mono text-xs text-muted">
                  {padIndex(index)}
                </span>
                <span>
                  <span className="block font-display text-xl font-bold uppercase tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                    {project.title}
                  </span>
                  <span className="mt-1 block text-xs text-muted md:hidden">
                    {project.category} · {project.year}
                  </span>
                </span>
                <span className="label-mono hidden md:block">
                  {project.category}
                </span>
                <span className="hidden font-mono text-xs text-muted md:block">
                  {project.year}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center border border-line text-ink transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                >
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            </Reveal>
          ))}

          {projects.length === 0 && (
            <p className="px-5 py-10 text-sm text-muted">
              No published projects yet — add one from the admin panel.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
