import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-shell";
import { DeleteButton } from "@/components/admin/controls";
import { SkillForm } from "@/components/admin/skill-form";
import { PencilIcon } from "@/components/ui/icons";
import { TechIcon } from "@/components/ui/tech-icon";
import { createSkillAction, deleteSkillAction } from "@/lib/actions/skills";
import { isDbConfigured } from "@/lib/db";
import { SKILL_CATEGORY_LABELS } from "@/lib/db/schema";
import { getGroupedSkills } from "@/lib/services/skills";

export default async function AdminSkillsPage() {
  const groups = await getGroupedSkills();
  const dbConnected = isDbConfigured();

  return (
    <>
      <AdminPageHeader
        title="Skills"
        description="Everything here appears in the Tech Stack section and the marquee."
      />

      <div className="space-y-8 p-6 md:p-8">
        {/* Add new */}
        <div className="rounded-xl border border-line bg-surface p-5 md:p-6">
          <p className="label-mono mb-5 !text-accent">Add a Skill</p>
          <SkillForm
            action={createSkillAction}
            submitLabel="Add Skill"
            disabled={!dbConnected}
            compact
          />
        </div>

        {/* Existing, grouped by category */}
        {groups.map((group) => (
          <div key={group.category} className="rounded-xl border border-line bg-surface">
            <p className="label-mono flex items-baseline justify-between border-b border-line px-5 py-4">
              {SKILL_CATEGORY_LABELS[group.category]}
              <span className="font-mono text-xs">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </p>
            <ul className="divide-y divide-line">
              {group.items.map((skill) => (
                <li
                  key={skill.id}
                  className="flex flex-wrap items-center gap-4 px-5 py-3.5 hover:bg-paper"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-paper">
                    <TechIcon icon={skill.icon} name={skill.name} size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{skill.name}</p>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    #{skill.sortOrder}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/skills/${skill.id}/edit`}
                      className="btn btn-outline btn-sm"
                    >
                      <PencilIcon size={13} /> Edit
                    </Link>
                    <DeleteButton
                      action={deleteSkillAction.bind(null, skill.id)}
                      confirmMessage={`Remove “${skill.name}”?`}
                      disabled={!dbConnected}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {groups.length === 0 && (
          <p className="rounded-xl border border-line bg-surface px-5 py-10 text-center text-sm text-muted">
            No skills yet — add your first one above.
          </p>
        )}
      </div>
    </>
  );
}
