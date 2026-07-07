import Link from "next/link";
import { CoverMedia } from "@/components/projects/cover-media";
import { ArrowUpRight } from "@/components/ui/icons";
import type { Project } from "@/lib/db/schema";
import { padIndex } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-ink"
    >
      {/* Photo cover with color fallback + vignette */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <CoverMedia
          image={project.coverImage}
          color={project.coverColor}
          zoomOnGroupHover
        />
        <span className="absolute left-5 top-4 font-mono text-xs tracking-[0.18em] text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          {padIndex(index)}
        </span>
        <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/50 text-white backdrop-blur-[2px] transition-all group-hover:border-white group-hover:bg-white group-hover:text-[#131311]">
          <ArrowUpRight size={16} />
        </span>
        <h3 className="absolute bottom-5 left-5 right-16 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] md:text-3xl">
          {project.title}
        </h3>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
        <p className="label-mono !text-ink">
          {project.category}
          <span className="mx-2 text-line">·</span>
          <span className="!text-muted">{project.year}</span>
        </p>
        <p className="label-mono hidden truncate sm:block">
          {project.stack.slice(0, 3).join(" / ")}
        </p>
      </div>
      <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
    </Link>
  );
}
