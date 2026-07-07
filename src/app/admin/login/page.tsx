import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { ArrowLeft } from "@/components/ui/icons";
import { isUsingDefaultPassword, verifySession } from "@/lib/auth/session";
import { siteConfig } from "@/lib/site-config";

export default async function AdminLoginPage() {
  if (await verifySession()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="label-mono text-center">
          <span className="text-accent">{siteConfig.initials}</span>
          <span className="mx-3 text-line">/</span>
          Admin Panel
        </p>
        <h1 className="mt-4 text-center font-display text-3xl font-bold uppercase tracking-tight">
          Sign In
        </h1>

        <div className="mt-8 rounded-xl border border-line bg-surface p-6">
          <LoginForm />
          {isUsingDefaultPassword() && (
            <p className="mt-4 rounded-lg border border-line bg-paper px-3 py-2.5 text-xs leading-relaxed text-muted">
              Using the default password{" "}
              <code className="font-mono font-semibold">admin123</code> — set{" "}
              <code className="font-mono">ADMIN_PASSWORD</code> in{" "}
              <code className="font-mono">.env.local</code> before deploying.
            </p>
          )}
        </div>

        <Link
          href="/"
          className="label-mono group mt-6 inline-flex items-center gap-2 !text-muted transition-colors hover:!text-accent"
        >
          <ArrowLeft size={13} />
          Back to site
        </Link>
      </div>
    </div>
  );
}
