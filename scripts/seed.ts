/**
 * Seeds NeonDB with the demo projects and skills.
 *
 *   npm run db:push   # create tables first
 *   npm run db:seed   # then seed
 *
 * NOTE: replaces all existing rows in `projects` and `skills`.
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config();

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { projects, skills } from "../src/lib/db/schema";
import { demoProjects, demoSkills } from "../src/lib/data/demo-data";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error(
      "DATABASE_URL is not set. Add your Neon connection string to .env.local first.",
    );
    process.exit(1);
  }

  const db = drizzle(neon(url));

  console.log("Clearing existing rows…");
  await db.delete(projects);
  await db.delete(skills);

  console.log(`Inserting ${demoProjects.length} projects…`);
  await db.insert(projects).values(
    demoProjects.map((project) => ({
      slug: project.slug,
      title: project.title,
      category: project.category,
      year: project.year,
      role: project.role,
      description: project.description,
      overview: project.overview,
      challenge: project.challenge,
      solution: project.solution,
      results: project.results,
      stack: project.stack,
      metrics: project.metrics,
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      coverColor: project.coverColor,
      coverImage: project.coverImage,
      featured: project.featured,
      published: project.published,
      sortOrder: project.sortOrder,
    })),
  );

  console.log(`Inserting ${demoSkills.length} skills…`);
  await db.insert(skills).values(
    demoSkills.map((skill) => ({
      name: skill.name,
      category: skill.category,
      icon: skill.icon,
      sortOrder: skill.sortOrder,
    })),
  );

  console.log("✔ Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
