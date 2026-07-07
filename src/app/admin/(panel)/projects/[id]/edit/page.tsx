import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProjectAction } from "@/lib/actions/projects";
import { isDbConfigured } from "@/lib/db";
import { getProjectById } from "@/lib/services/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const projectId = Number(id);
  if (!Number.isInteger(projectId)) notFound();

  const project = await getProjectById(projectId);
  if (!project) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit — ${project.title}`}
        description={`/work/${project.slug}`}
      />
      <div className="p-6 md:p-8">
        <ProjectForm
          action={updateProjectAction.bind(null, project.id)}
          project={project}
          submitLabel="Save Changes"
          disabled={!isDbConfigured()}
        />
      </div>
    </>
  );
}
