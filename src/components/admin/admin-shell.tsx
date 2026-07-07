import Link from "next/link";
import { LogoutButton } from "@/components/admin/controls";
import {
  FileTextIcon,
  FolderIcon,
  GlobeIcon,
  GridIcon,
  LayersIcon,
} from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: GridIcon },
  { href: "/admin/projects", label: "Projects", icon: FolderIcon },
  { href: "/admin/skills", label: "Skills", icon: LayersIcon },
  { href: "/admin/resume", label: "Resume", icon: FileTextIcon },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="flex shrink-0 flex-col border-b border-line bg-surface md:w-60 md:border-b-0 md:border-r">
        <Link
          href="/admin"
          className="flex h-16 items-center border-b border-line px-5 font-display text-base font-bold uppercase tracking-tight"
        >
          {siteConfig.initials}
          <span className="text-accent">.</span>
          <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted">
            Admin
          </span>
        </Link>

        <nav className="flex flex-row md:flex-col" aria-label="Admin">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 items-center justify-center gap-3 border-r border-line px-3 py-3.5 text-sm font-medium transition-colors last:border-r-0 hover:bg-paper hover:text-accent md:flex-none md:justify-start md:border-b md:border-r-0 md:px-5"
            >
              <item.icon size={16} />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto hidden border-t border-line md:block">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 border-b border-line px-5 py-3.5 text-sm font-medium transition-colors hover:bg-paper hover:text-accent"
          >
            <GlobeIcon size={16} />
            View Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 bg-paper">{children}</div>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface px-6 py-5 md:px-8">
      <div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
