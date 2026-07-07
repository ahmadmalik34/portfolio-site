import Link from "next/link";
import { ArrowLeft } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="label-mono">
        <span className="text-accent">Error</span>
        <span className="mx-3 text-line">/</span>
        Page Not Found
      </p>
      <h1 className="text-stroke mt-6 font-display text-[8rem] font-bold leading-none tracking-tight md:text-[12rem]">
        404
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        This page doesn&apos;t exist — or it was unpublished from the admin
        panel.
      </p>
      <Link href="/" className="btn btn-ink mt-8">
        <ArrowLeft size={14} /> Back Home
      </Link>
    </div>
  );
}
