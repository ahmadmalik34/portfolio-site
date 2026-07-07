import { AdminPageHeader } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { createProjectAction } from "@/lib/actions/projects";
import { isDbConfigured } from "@/lib/db";

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader
        title="New Project"
        description="Add a project or case study to your portfolio."
      />
      <div className="p-6 md:p-8">
        <ProjectForm
          action={createProjectAction}
          submitLabel="Create Project"
          disabled={!isDbConfigured()}
        />
      </div>
    </>
  );
}
