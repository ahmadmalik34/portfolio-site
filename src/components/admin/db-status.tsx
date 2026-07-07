import { DatabaseIcon } from "@/components/ui/icons";
import { isDbConfigured } from "@/lib/db";

/**
 * Warns when no NeonDB connection string is configured — the site then runs
 * on read-only demo data and admin editing is disabled.
 */
export function DbStatusBanner() {
  if (isDbConfigured()) return null;

  return (
    <div className="flex items-start gap-3 border-b border-line bg-ink px-6 py-4 text-paper md:px-8">
      <DatabaseIcon size={18} className="mt-0.5 shrink-0 text-accent" />
      <div className="text-sm leading-relaxed">
        <p className="font-medium">
          Demo mode — no database connected (content is read-only).
        </p>
        <p className="mt-1 opacity-70">
          Add your NeonDB <code className="font-mono">DATABASE_URL</code> to{" "}
          <code className="font-mono">.env.local</code>, then run{" "}
          <code className="font-mono">npm run db:push</code> and{" "}
          <code className="font-mono">npm run db:seed</code>. See the README
          for the full walkthrough.
        </p>
      </div>
    </div>
  );
}
