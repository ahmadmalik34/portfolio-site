import Link from "next/link";
import {
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    handle: "in/ahmadmalik34",
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    handle: "@ahmadmalik34",
    icon: GitHubIcon,
  },
  {
    label: "WhatsApp",
    href: siteConfig.links.whatsapp,
    handle: "+92 303 5082823",
    icon: WhatsAppIcon,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    handle: siteConfig.email,
    icon: MailIcon,
  },
] as const;

export function Footer() {
  return (
    <footer id="contact" className="border-t border-dark-line bg-dark text-ink">
      {/* Big call to action */}
      <div className="container-x border-b border-dark-line py-16 sm:py-20 md:py-28">
        <Reveal>
          <p className="label-mono">
            <span className="text-accent">05</span>
            <span className="mx-3 text-dark-line">/</span>
            Contact
          </p>
          <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Have a project
            <br />
            in mind<span className="text-accent">?</span>
          </h2>
          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn btn-accent max-w-full normal-case tracking-normal"
            >
              <span className="truncate">{siteConfig.email}</span>
            </a>
            <a
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
            >
              WhatsApp Me
            </a>
          </div>
        </Reveal>
      </div>

      {/* Social links */}
      <div className="container-x grid grid-cols-1 border-b border-dark-line sm:grid-cols-2 lg:grid-cols-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 border-b border-dark-line px-1 py-5 transition-colors last:border-b-0 hover:bg-accent hover:text-white sm:border-b-0 sm:border-l sm:px-6 sm:py-6 lg:last:border-r"
          >
            <span className="flex min-w-0 items-center gap-3">
              <social.icon size={18} className="shrink-0" />
              <span className="min-w-0">
                <span className="block font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
                  {social.label}
                </span>
                <span className="block truncate text-sm">{social.handle}</span>
              </span>
            </span>
            <ArrowUpRight
              size={18}
              className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="container-x flex flex-col items-start justify-between gap-2 py-6 font-mono text-[11px] uppercase tracking-[0.18em] opacity-60 md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.location}
        </p>
        <p>
          {siteConfig.timezone} ·{" "}
          <Link href="/admin" className="underline-offset-4 hover:underline">
            Admin
          </Link>{" "}
          · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
