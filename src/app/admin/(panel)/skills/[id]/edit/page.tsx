import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { SkillForm } from "@/components/admin/skill-form";
import { updateSkillAction } from "@/lib/actions/skills";
import { isDbConfigured } from "@/lib/db";
import { getSkillById } from "@/lib/services/skills";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSkillPage({ params }: PageProps) {
  const { id } = await params;
  const skillId = Number(id);
  if (!Number.isInteger(skillId)) notFound();

  const skill = await getSkillById(skillId);
  if (!skill) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit — ${skill.name}`}
        description="Change the name, category, icon or order."
      />
      <div className="p-6 md:p-8">
        <div className="max-w-3xl rounded-xl border border-line bg-surface p-5 md:p-6">
          <SkillForm
            action={updateSkillAction.bind(null, skill.id)}
            skill={skill}
            submitLabel="Save Changes"
            disabled={!isDbConfigured()}
          />
        </div>
      </div>
    </>
  );
}
