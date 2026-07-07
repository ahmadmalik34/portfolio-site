import { AdminShell } from "@/components/admin/admin-shell";
import { DbStatusBanner } from "@/components/admin/db-status";
import { requireAdmin } from "@/lib/auth/session";

export default async function AdminPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <AdminShell>
      <DbStatusBanner />
      {children}
    </AdminShell>
  );
}
