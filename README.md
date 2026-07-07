# Muhammad Ahmad — Portfolio

A fast, dark, flat-design portfolio for a full-stack web developer, with a database-backed admin panel for managing projects and skills.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Drizzle ORM · NeonDB (Postgres)** — designed for deployment on **Vercel**.

---

## Features

**Public site**

- Dark editorial design — warm near-black greys, soft-white type, international-orange accent (+ terminal-green for data-science touches). Flat colors only, zero gradients. Two-font system: Sora (display & body) + JetBrains Mono (labels, terminal).
- Home: typing-terminal hero, count-up stats, scrolling tech marquee, featured projects, grouped tech stack, about & services, big contact footer
- `/work` — index of all published projects
- `/work/[slug]` — full case-study pages (overview, challenge, solution, results + metrics, prev/next navigation)
- `/resume` — structured résumé page with a PDF download button
- Floating WhatsApp button on every page (bottom-right)
- Tasteful motion: scroll reveals, self-drawing section rules, nav underlines, terminal typing — all `prefers-reduced-motion` safe
- Fully responsive: phone, tablet, laptop, wide desktop
- SEO: metadata, Open Graph, JSON-LD person schema, `sitemap.xml`, `robots.txt`

**Admin panel — `/admin`**

- Password-protected (signed HttpOnly session cookie)
- Projects: create / edit / delete, publish & feature toggles, sort order, cover color with live preview, case-study fields, metrics
- Skills: add / edit / remove, grouped by category, with three icon options:
  - **Upload from your PC** — PNG, JPG or SVG, max 300 KB, raster images auto-resized to 128px (stored in NeonDB, works on Vercel with no file storage)
  - a [simple-icons](https://simpleicons.org) slug (`react`, `django`, `nextdotjs`…)
  - any image URL
  - remove/change anytime; empty falls back to a clean monogram
- Resume: upload/replace/delete the downloadable PDF (stored in NeonDB — replaceable on Vercel without redeploying); page text lives in `src/lib/data/resume-data.ts`
- Demo mode: without a database the site runs on built-in demo content; saving changes requires `DATABASE_URL`

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The site works immediately with demo data — no database needed yet.

Admin: <http://localhost:3000/admin> — default password `admin123` (change it before deploying, see below).

## Connect NeonDB

1. Create a free Postgres database at [neon.tech](https://neon.tech).
2. Copy the **pooled** connection string (the one containing `-pooler`).
3. Create `.env.local` from the example and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require"
   ADMIN_PASSWORD="your-strong-password"
   AUTH_SECRET="a-long-random-string"       # e.g. openssl rand -hex 32
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. Create the tables and seed the demo content:

   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Restart `npm run dev`. The admin panel is now fully editable — everything you change is live on the site (pages revalidate every 60s in production).

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.local` in **Project → Settings → Environment Variables** (set `NEXT_PUBLIC_SITE_URL` to your production domain).
4. Deploy. Neon's serverless driver (`@neondatabase/serverless` over HTTP) is purpose-built for Vercel's serverless functions — no connection-pool problems.

> Tip: Vercel's Neon integration (Marketplace → Storage → Neon) can create the database and inject `DATABASE_URL` automatically.

## Scripts

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server                           |
| `npm run build`     | Production build                               |
| `npm run start`     | Serve the production build                     |
| `npm run lint`      | Run ESLint                                     |
| `npm run db:push`   | Sync the Drizzle schema to NeonDB              |
| `npm run db:seed`   | Seed demo projects & skills (replaces rows)    |
| `npm run db:studio` | Browse the database in Drizzle Studio          |

## Project structure

```
portfolio/
├── drizzle.config.ts          # Drizzle Kit config (schema push/studio)
├── scripts/
│   └── seed.ts                # NeonDB seeder (demo content)
└── src/
    ├── app/
    │   ├── layout.tsx         # Root layout: fonts, global metadata
    │   ├── globals.css        # Dark design tokens & utilities (Tailwind v4)
    │   ├── sitemap.ts         # /sitemap.xml
    │   ├── robots.ts          # /robots.txt
    │   ├── not-found.tsx      # 404
    │   ├── (site)/            # Public site (shared header/footer)
    │   │   ├── page.tsx       # Home
    │   │   └── work/
    │   │       ├── page.tsx   # All projects index
    │   │       └── [slug]/    # Case-study detail pages
    │   └── admin/
    │       ├── login/         # Password login (outside the auth guard)
    │       └── (panel)/       # Auth-guarded admin: dashboard, projects, skills
    ├── components/
    │   ├── layout/            # Header, footer
    │   ├── sections/          # Hero (terminal), marquee, work, skills, about
    │   ├── projects/          # Project card
    │   ├── admin/             # Admin shell, forms, controls
    │   └── ui/                # Icons, reveal, count-up, tech-icon, headings
    └── lib/
        ├── db/                # Drizzle schema + Neon client
        ├── services/          # Data reads (DB with demo-data fallback)
        ├── actions/           # Server actions (auth, projects, skills)
        ├── auth/              # Session signing/verification
        ├── data/              # Demo content (also used by the seeder)
        ├── site-config.ts     # Your name, links, copy, stats
        └── utils.ts           # Small helpers
```

## Customizing

- **Your info & links** — edit `src/lib/site-config.ts` (name, tagline, stats, services, social links, terminal lines live in `src/components/sections/hero.tsx`).
- **Colors** — flat dark tokens at the top of `src/app/globals.css` (`--accent`, `--paper`, `--ink`, `--green`, …). No gradients anywhere.
- **Demo content** — `src/lib/data/demo-data.ts` (used when no DB is configured, and by `npm run db:seed`).

## Security notes

- Set a strong `ADMIN_PASSWORD` and a random `AUTH_SECRET` in production — the `admin123` default is for local development only.
- The admin session is a signed, HttpOnly, SameSite=Lax cookie valid for 7 days.
- Icon uploads are validated on both client and server (PNG/JPG/SVG only, size-capped) and stored as data URLs in Postgres — no external file storage needed.
- All mutating server actions re-verify the session server-side; `/admin` is excluded from search indexing.
