import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import {
  ArrowUpRight,
  DatabaseIcon,
  FolderIcon,
  LayersIcon,
  PlusIcon,
} from "@/components/ui/icons";
import { isDbConfigured } from "@/lib/db";
import { getAllProjects } from "@/lib/services/projects";
import { getSkills } from "@/lib/services/skills";

export default async function AdminDashboardPage() {
  const [projects, skills] = await Promise.all([getAllProjects(), getSkills()]);
  const publishedCount = projects.filter((p) => p.published).length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const dbConnected = isDbConfigured();

  const cards = [
    {
      label: "Projects",
      value: projects.length,
      hint: `${publishedCount} published · ${featuredCount} featured`,
      href: "/admin/projects",
      icon: FolderIcon,
    },
    {
      label: "Skills",
      value: skills.length,
      hint: "Shown in stack & marquee",
      href: "/admin/skills",
      icon: LayersIcon,
    },
    {
      label: "Database",
      value: dbConnected ? "Neon" : "Demo",
      hint: dbConnected
        ? "NeonDB connected — edits are live"
        : "Read-only demo data",
      href: "/admin",
      icon: DatabaseIcon,
    },
  ] as const;

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Manage what appears on your portfolio."
      />

      <div className="p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-ink"
            >
              <div className="flex items-center justify-between">
                <card.icon size={18} className="text-muted" />
                <ArrowUpRight
                  size={16}
                  className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
              <p className="mt-6 font-display text-4xl font-bold tracking-tight">
                {card.value}
              </p>
              <p className="label-mono mt-2">{card.label}</p>
              <p className="mt-2 text-xs text-muted">{card.hint}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-line bg-surface">
          <p className="label-mono border-b border-line px-6 py-4">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-4 p-6">
            <Link href="/admin/projects/new" className="btn btn-ink btn-sm">
              <PlusIcon size={14} /> New Project
            </Link>
            <Link href="/admin/skills" className="btn btn-outline btn-sm">
              <PlusIcon size={14} /> Add Skill
            </Link>
            <Link href="/" target="_blank" className="btn btn-outline btn-sm">
              <ArrowUpRight size={14} /> View Live Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
