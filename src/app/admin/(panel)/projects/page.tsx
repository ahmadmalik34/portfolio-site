import Link from "next/link";
import {
  AdminPageHeader,
} from "@/components/admin/admin-shell";
import { DeleteButton } from "@/components/admin/controls";
import { ArrowUpRight, PencilIcon, PlusIcon } from "@/components/ui/icons";
import { deleteProjectAction } from "@/lib/actions/projects";
import { isDbConfigured } from "@/lib/db";
import { getAllProjects } from "@/lib/services/projects";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();
  const dbConnected = isDbConfigured();

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description={`${projects.length} total — drag order via the sort field.`}
        action={
          <Link href="/admin/projects/new" className="btn btn-ink btn-sm">
            <PlusIcon size={14} /> New Project
          </Link>
        }
      />

      <div className="p-6 md:p-8">
        <div className="overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {["Order", "Project", "Category", "Year", "Status", "Actions"].map(
                  (column) => (
                    <th key={column} className="label-mono px-5 py-3.5 font-normal">
                      {column}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {projects.map((project) => (
                <tr key={project.id} className="group hover:bg-paper">
                  <td className="px-5 py-4 font-mono text-xs text-muted">
                    {String(project.sortOrder).padStart(2, "0")}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="size-3 shrink-0 border border-line"
                        style={{ backgroundColor: project.coverColor }}
                      />
                      <div>
                        <p className="font-medium">
                          {project.title}
                          {project.featured && (
                            <span className="ml-2 border border-accent px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                              Featured
                            </span>
                          )}
                        </p>
                        <p className="font-mono text-xs text-muted">
                          /work/{project.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted">{project.category}</td>
                  <td className="px-5 py-4 font-mono text-xs">{project.year}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        project.published
                          ? "rounded-lg border border-line bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink"
                          : "border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                      }
                    >
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="btn btn-outline btn-sm"
                      >
                        <PencilIcon size={13} /> Edit
                      </Link>
                      <Link
                        href={`/work/${project.slug}`}
                        target="_blank"
                        className="btn btn-outline btn-sm"
                        aria-label={`View ${project.title}`}
                      >
                        <ArrowUpRight size={13} />
                      </Link>
                      <DeleteButton
                        action={deleteProjectAction.bind(null, project.id)}
                        confirmMessage={`Delete “${project.title}” permanently?`}
                        disabled={!dbConnected}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted">
                    No projects yet — create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
