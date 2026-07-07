import { AboutSection } from "@/components/sections/about-section";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { SkillsSection } from "@/components/sections/skills-section";
import { getFeaturedProjects } from "@/lib/services/projects";
import { getGroupedSkills, getSkills } from "@/lib/services/skills";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, groupedSkills, allSkills] = await Promise.all([
    getFeaturedProjects(4),
    getGroupedSkills(),
    getSkills(),
  ]);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    url: siteConfig.url,
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
    knowsAbout: allSkills.map((skill) => skill.name),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Marquee items={allSkills.map((skill) => skill.name)} />
      <FeaturedWork projects={featured} />
      <SkillsSection groups={groupedSkills} />
      <AboutSection />
    </>
  );
}
