import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type Metric = {
  value: string;
  label: string;
};

export const SKILL_CATEGORIES = ["web", "data", "tools"] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  web: "Web Development",
  data: "Data Science & ML",
  tools: "Languages & Tools",
};

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  year: text("year").notNull(),
  role: text("role").notNull().default("Full-Stack Developer"),
  description: text("description").notNull(),
  overview: text("overview").notNull().default(""),
  challenge: text("challenge").notNull().default(""),
  solution: text("solution").notNull().default(""),
  results: text("results").notNull().default(""),
  stack: jsonb("stack")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  metrics: jsonb("metrics")
    .$type<Metric[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  liveUrl: text("live_url").notNull().default(""),
  repoUrl: text("repo_url").notNull().default(""),
  coverColor: text("cover_color").notNull().default("#ff4d00"),
  /** Photo cover (URL or uploaded data URL). Falls back to coverColor. */
  coverImage: text("cover_image").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").$type<SkillCategory>().notNull().default("web"),
  /** simple-icons slug, image URL, or uploaded data URL. Empty = monogram. */
  icon: text("icon").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * The downloadable resume PDF, stored as base64 so it can be replaced from
 * the admin panel on Vercel without any file-storage service. At most one
 * row; when empty, the bundled public/docs PDF is served instead.
 */
export const resume = pgTable("resume", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull().default("Muhammad-Ahmad-Resume.pdf"),
  data: text("data").notNull(),
  size: integer("size").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type ResumeRow = typeof resume.$inferSelect;
