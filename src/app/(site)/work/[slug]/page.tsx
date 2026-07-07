import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  GitHubIcon,
} from "@/components/ui/icons";
import { CoverMedia } from "@/components/projects/cover-media";
import { Reveal } from "@/components/ui/reveal";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getPublishedProjects,
} from "@/lib/services/projects";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
    },
  };
}

const STORY_SECTIONS = [
  { key: "overview", number: "01", title: "Overview" },
  { key: "challenge", number: "02", title: "The Challenge" },
  { key: "solution", number: "03", title: "The Solution" },
  { key: "results", number: "04", title: "The Results" },
] as const;

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || !project.published) notFound();

  const { previous, next } = await getAdjacentProjects(slug);

  return (
    <article>
      {/* Case-study header */}
      <header className="border-b border-line">
        <div className="container-x py-12 md:py-20">
          <Reveal>
            <Link
              href="/work"
              className="label-mono group inline-flex items-center gap-2 !text-ink transition-colors hover:!text-accent"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              All Projects
            </Link>

            <p className="label-mono mt-10">
              <span className="text-accent">Case Study</span>
              <span className="mx-3 text-line">/</span>
              {project.category}
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-8xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {project.description}
            </p>
          </Reveal>

          {/* Meta grid */}
          <Reveal delay={100}>
            <dl className="mt-12 grid grid-cols-1 divide-y divide-line rounded-xl border border-line bg-surface sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0 [&>div]:p-5">
              <div>
                <dt className="label-mono">Role</dt>
                <dd className="mt-2 text-sm font-medium">{project.role}</dd>
              </div>
              <div className="sm:!border-t-0">
                <dt className="label-mono">Year</dt>
                <dd className="mt-2 text-sm font-medium">{project.year}</dd>
              </div>
              <div>
                <dt className="label-mono">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-line bg-paper px-2 py-1 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label-mono">Links</dt>
                <dd className="mt-2 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      <ExternalLink size={14} /> Live Site
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      <GitHubIcon size={14} /> Repository
                    </a>
                  )}
                  {!project.liveUrl && !project.repoUrl && (
                    <span className="text-sm text-muted">Private project</span>
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      {/* Cover band — photo with vignette (color fallback) */}
      <div className="relative overflow-hidden border-b border-line">
        <CoverMedia image={project.coverImage} color={project.coverColor} />
        <div className="container-x relative flex h-56 items-center justify-between md:h-80">
          <span className="font-display text-6xl font-bold uppercase tracking-tight text-white/40 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] md:text-9xl">
            {project.year}
          </span>
          <span className="hidden text-right font-mono text-xs uppercase tracking-[0.18em] text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] md:block">
            {project.stack.slice(0, 3).join(" — ")}
          </span>
        </div>
      </div>

      {/* Story sections */}
      <div className="border-b border-line">
        <div className="container-x max-w-4xl py-16 md:py-24">
          {STORY_SECTIONS.map((section) => {
            const body = project[section.key];
            if (!body) return null;
            return (
              <Reveal key={section.key}>
                <section className="mb-14 last:mb-0">
                  <h2 className="flex items-baseline gap-4 border-b border-line pb-3">
                    <span className="font-mono text-xs text-accent">
                      {section.number}
                    </span>
                    <span className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                      {section.title}
                    </span>
                  </h2>
                  <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
                    {body}
                  </p>

                  {section.key === "results" &&
                    project.metrics.length > 0 && (
                      <dl className="mt-8 grid grid-cols-1 divide-y divide-line rounded-xl border border-line bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                        {project.metrics.map((metric) => (
                          <div key={metric.label} className="p-6">
                            <dd className="font-display text-4xl font-bold tracking-tight text-accent">
                              {metric.value}
                            </dd>
                            <dt className="mt-2 text-sm text-muted">
                              {metric.label}
                            </dt>
                          </div>
                        ))}
                      </dl>
                    )}
                </section>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Previous / next navigation */}
      <nav
        className="grid border-b border-line sm:grid-cols-2"
        aria-label="More projects"
      >
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="group container-x flex items-center justify-between gap-4 border-b border-line py-8 transition-colors hover:bg-surface sm:border-b-0 sm:border-r"
          >
            <span className="flex items-center gap-4">
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>
                <span className="label-mono block">Previous</span>
                <span className="font-display text-xl font-bold uppercase tracking-tight">
                  {previous.title}
                </span>
              </span>
            </span>
          </Link>
        ) : (
          <span className="hidden border-b border-line sm:block sm:border-b-0 sm:border-r" />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group container-x flex items-center justify-between gap-4 py-8 text-right transition-colors hover:bg-surface"
          >
            <span className="ml-auto flex items-center gap-4">
              <span>
                <span className="label-mono block">Next</span>
                <span className="font-display text-xl font-bold uppercase tracking-tight">
                  {next.title}
                </span>
              </span>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        ) : (
          <Link
            href="/work"
            className="group container-x flex items-center justify-end gap-4 py-8 transition-colors hover:bg-surface"
          >
            <span className="label-mono">Back to Index</span>
            <ArrowUpRight size={18} />
          </Link>
        )}
      </nav>
    </article>
  );
}
