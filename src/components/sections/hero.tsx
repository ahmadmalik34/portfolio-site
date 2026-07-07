import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";
import {
  ArrowRight,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";
import { cx } from "@/lib/utils";

/** Fake shell session — typed line by line on load. Flat colors only. */
const TERMINAL_LINES = [
  { text: "$ whoami", tone: "cmd" },
  { text: "ahmad-malik · full-stack developer", tone: "out" },
  { text: "$ stack --list", tone: "cmd" },
  { text: "django · drf · react · next.js · redux", tone: "out" },
  { text: "$ python train.py --model churn", tone: "cmd" },
  { text: "epoch 12/12 ▮▮▮▮▮▮▮▮▮▮ auc 0.91 ✓", tone: "ok" },
] as const;

const TONE_CLASS = {
  cmd: "text-ink",
  out: "text-muted",
  ok: "text-green",
} as const;

function TerminalCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-line" aria-hidden="true" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-muted">
          ahmad@portfolio — zsh
        </span>
      </div>
      {/* Typed session */}
      <div className="p-4 font-mono text-[12px] leading-7 sm:text-[13px] md:p-5">
        {TERMINAL_LINES.map((line, index) => (
          <span
            key={line.text}
            className={cx("term-line", TONE_CLASS[line.tone])}
            style={{ animationDelay: `${0.3 + index * 0.55}s` }}
          >
            {line.text}
          </span>
        ))}
        <span
          className="term-caret"
          style={{ animationDelay: `${0.3 + TERMINAL_LINES.length * 0.55}s` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-x py-14 md:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Left — headline & CTAs */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface px-4 py-2">
                <span
                  className="size-2 bg-accent animate-blink"
                  aria-hidden="true"
                />
                <span className="label-mono !text-ink">
                  {siteConfig.availability}
                </span>
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 font-display font-bold uppercase leading-[0.92] tracking-tight">
                <span className="block text-[14vw] sm:text-[11vw] md:text-7xl lg:text-8xl">
                  {siteConfig.headline[0]}
                </span>
                <span className="text-stroke block text-[14vw] sm:text-[11vw] md:text-7xl lg:text-8xl">
                  {siteConfig.headline[1]}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                I&apos;m{" "}
                <span className="font-medium text-ink">{siteConfig.name}</span>{" "}
                — {siteConfig.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/#work" className="btn btn-accent">
                  View Work <ArrowRight size={14} />
                </Link>
                <Link href="/#contact" className="btn btn-outline">
                  Get In Touch
                </Link>
              </div>

              {/* Social links — standout circular icons */}
              <div className="mt-8 flex items-center gap-3">
                {(
                  [
                    { icon: GitHubIcon, href: siteConfig.links.github, label: "GitHub" },
                    { icon: LinkedInIcon, href: siteConfig.links.linkedin, label: "LinkedIn" },
                    { icon: WhatsAppIcon, href: siteConfig.links.whatsapp, label: "WhatsApp" },
                    { icon: MailIcon, href: `mailto:${siteConfig.email}`, label: "Email" },
                  ] as const
                ).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="grid size-11 place-items-center rounded-full border border-line bg-surface text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — terminal */}
          <Reveal delay={200}>
            <TerminalCard />
            <p className="label-mono mt-3 text-right">
              {"// live from "}{siteConfig.location} · {siteConfig.timezone}
            </p>
          </Reveal>
        </div>

        {/* Stats strip — counts up on view */}
        <Reveal delay={120}>
          <dl className="mt-12 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-surface md:mt-16">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="px-3 py-4 sm:px-5 sm:py-6">
                <dd className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="mt-1.5 text-[10px] leading-snug text-muted sm:text-xs">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
