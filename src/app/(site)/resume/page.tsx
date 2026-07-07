import type { Metadata } from "next";
import {
  DownloadIcon,
  ExternalLink,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { resumeData } from "@/lib/data/resume-data";
import { getResumeMeta } from "@/lib/services/resume";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resume",
  description: `${resumeData.name} — ${resumeData.title}. Experience, projects, education and skills, with a downloadable PDF.`,
};

const CONTACT_ICONS: Record<string, typeof MailIcon> = {
  Email: MailIcon,
  Phone: PhoneIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
};

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="flex items-baseline gap-4 border-b border-line pb-3">
      <span className="font-mono text-xs text-accent">{number}</span>
      <span className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
        {title}
      </span>
    </h2>
  );
}

export default async function ResumePage() {
  const uploadedMeta = await getResumeMeta();

  return (
    <div className="border-b border-line">
      <div className="container-x max-w-4xl py-14 md:py-20">
        {/* Header */}
        <Reveal>
          <p className="label-mono">
            <span className="text-accent">Résumé</span>
            <span className="mx-3 text-line">/</span>
            {resumeData.title}
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            {resumeData.name}
          </h1>

          {/* Contact chips */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {resumeData.contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
              >
                {(() => {
                  const Icon = CONTACT_ICONS[contact.label];
                  return Icon ? (
                    <Icon size={15} className="shrink-0 text-accent" />
                  ) : null;
                })()}
                <span className="label-mono">{contact.label}</span>
                <span className="text-xs text-ink transition-colors group-hover:text-accent sm:text-sm">
                  {contact.value}
                </span>
              </a>
            ))}
          </div>

          {/* Download */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/api/resume" className="btn btn-accent">
              <DownloadIcon size={15} /> Download PDF
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {uploadedMeta
                ? `${uploadedMeta.filename} · ${Math.round(uploadedMeta.size / 1024)} KB`
                : "PDF · latest version"}
            </span>
          </div>
        </Reveal>

        {/* Summary */}
        <Reveal>
          <section className="mt-14">
            <SectionTitle number="01" title="Summary" />
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {resumeData.summary}
            </p>
          </section>
        </Reveal>

        {/* Experience */}
        <Reveal>
          <section className="mt-14">
            <SectionTitle number="02" title="Work Experience" />
            <div className="mt-6 space-y-6">
              {resumeData.experience.map((job) => (
                <article
                  key={job.company}
                  className="rounded-xl border border-line bg-surface p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                      {job.company}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-accent">{job.role}</p>
                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 32)}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 size-1.5 shrink-0 bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Projects */}
        <Reveal>
          <section className="mt-14">
            <SectionTitle number="03" title="Relevant Projects" />
            <div className="mt-6 space-y-6">
              {resumeData.projects.map((project) => (
                <article
                  key={project.name}
                  className="rounded-xl border border-line bg-surface p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                      {project.name}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {project.meta}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {project.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 32)}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 size-1.5 shrink-0 bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Education */}
        <Reveal>
          <section className="mt-14">
            <SectionTitle number="04" title="Education" />
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {resumeData.education.map((entry) => (
                <article
                  key={entry.degree}
                  className="rounded-xl border border-line bg-surface p-5 md:p-6"
                >
                  <p className="font-mono text-xs text-muted">{entry.period}</p>
                  <h3 className="mt-2 font-display text-base font-bold uppercase tracking-tight">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{entry.school}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Skills */}
        <Reveal>
          <section className="mt-14">
            <SectionTitle number="05" title="Skills" />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {resumeData.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-line bg-surface px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Bottom download */}
        <Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface p-6">
            <p className="font-display text-lg font-bold uppercase tracking-tight">
              Want a copy for later?
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/api/resume" className="btn btn-accent btn-sm">
                <DownloadIcon size={14} /> Download PDF
              </a>
              <a
                href="mailto:m.ahmadmalik03@gmail.com"
                className="btn btn-outline btn-sm"
              >
                <ExternalLink size={14} /> Contact Me
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
