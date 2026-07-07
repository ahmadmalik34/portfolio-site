import type { Project, Skill } from "@/lib/db/schema";

/**
 * Demo content used when DATABASE_URL is not configured, and as the
 * source for `npm run db:seed` once NeonDB is connected.
 */

const seededAt = new Date("2026-01-15T10:00:00Z");

export const demoProjects: Project[] = [
  {
    id: 1,
    slug: "cartlyft-headless-commerce",
    title: "Cartlyft",
    category: "Full-Stack · E-Commerce",
    year: "2026",
    role: "Full-Stack Developer",
    description:
      "A headless e-commerce platform with a Django REST Framework core and a storefront built for speed in Next.js.",
    overview:
      "Cartlyft is a headless commerce platform built for a growing retail brand that had outgrown its off-the-shelf store. The backend exposes a clean, versioned REST API for catalog, cart, checkout and order management, while the storefront is a fully server-rendered Next.js application. Content editors manage 40,000+ SKUs through a custom Django admin, and the storefront consumes everything over the API — so the same backend now also powers the brand's mobile app.",
    challenge:
      "The legacy store took over six seconds to render category pages and buckled during flash sales. Inventory lived in three different systems, checkout was a black box nobody wanted to touch, and every design change required a plugin developer. The brand needed full control of the frontend without rebuilding its business logic every time.",
    solution:
      "I designed a service-oriented Django backend with DRF viewsets for catalog, pricing and orders, backed by PostgreSQL and a Redis cache for hot category queries. Cart state on the client is handled with Redux Toolkit, synced to the API on every mutation. The Next.js storefront uses static generation for category and product pages with incremental revalidation, so merchandising changes go live in under a minute — without a deploy. Checkout was rebuilt as a strict state machine with idempotent order-creation endpoints, making double-charges impossible even on flaky connections.",
    results:
      "The new storefront renders category pages in well under a second and survived its first flash sale — 11x normal traffic — without a single dropped order. Conversion rose sharply within the first quarter, and the brand's iOS app now ships features against the same API the web team uses.",
    stack: [
      "Next.js",
      "Django REST Framework",
      "Redux Toolkit",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    metrics: [
      { value: "0.8s", label: "Category page LCP" },
      { value: "+38%", label: "Conversion rate" },
      { value: "40k+", label: "SKUs served via API" },
    ],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/ahmadmalik34",
    coverColor: "#ff4d00",
    coverImage: "https://picsum.photos/seed/cartlyft/1280/800",
    featured: true,
    published: true,
    sortOrder: 1,
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 2,
    slug: "mediqueue-clinic-management",
    title: "MediQueue",
    category: "Full-Stack · Healthcare",
    year: "2025",
    role: "Backend Lead & Frontend Developer",
    description:
      "A clinic management system handling appointments, queues and patient records for a network of 12 clinics.",
    overview:
      "MediQueue is a multi-tenant clinic management system used daily by reception staff, doctors and lab technicians across a network of clinics. It covers the full patient journey: online booking, live queue management on waiting-room displays, consultation notes, prescriptions and billing. The backend is Django with a DRF API; the staff-facing frontend is React with Bootstrap 5, chosen so the client's in-house team could maintain it comfortably.",
    challenge:
      "Front desks ran on paper registers and a shared spreadsheet. Patients routinely waited 90+ minutes with no visibility, double-bookings were daily events, and doctors had no access to visit history. The system had to work reliably on modest hardware and survive the occasional power cut — and it had to be strictly correct about patient data.",
    solution:
      "I modelled the domain in Django with row-level tenancy per clinic and an audit trail on every medical record mutation. The DRF API drives a React SPA with Redux for queue state, kept live via polling with optimistic updates so receptionists never wait on the network. Waiting-room TVs run a read-only display fed by the same API. Appointment slots are generated server-side with conflict detection at the database level — a unique constraint, not an if-statement — which eliminated double-bookings entirely.",
    results:
      "Average front-desk processing time dropped by nearly two thirds, and patients now see their live queue position on the waiting-room screen and on their phones. The network onboarded eight additional clinics onto the same deployment during the following year with zero schema changes.",
    stack: [
      "Django",
      "Django REST Framework",
      "React",
      "Redux",
      "Bootstrap",
      "PostgreSQL",
    ],
    metrics: [
      { value: "-63%", label: "Front-desk processing time" },
      { value: "12", label: "Clinics on one deployment" },
      { value: "0", label: "Double-bookings since launch" },
    ],
    liveUrl: "",
    repoUrl: "https://github.com/ahmadmalik34",
    coverColor: "#2757f5",
    coverImage: "https://picsum.photos/seed/mediqueue/1280/800",
    featured: true,
    published: true,
    sortOrder: 2,
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 3,
    slug: "signalyze-sales-analytics",
    title: "Signalyze",
    category: "Data · Analytics Platform",
    year: "2025",
    role: "Full-Stack & Data Developer",
    description:
      "A sales analytics platform that turns millions of raw transaction rows into dashboards executives actually read.",
    overview:
      "Signalyze ingests raw point-of-sale exports from a distribution company — around four million rows a day — cleans them with a Pandas pipeline, and serves aggregated insights through a DRF API to a Next.js dashboard. Fourteen dashboards cover revenue, regional performance, product velocity and rep leaderboards, with every chart drillable down to the underlying transactions.",
    challenge:
      "The company's analysts spent the first week of every month assembling a single Excel report, and by the time it circulated, it was stale. Data arrived as inconsistent CSV dumps from three legacy systems with mismatched product codes, duplicated rows and silent encoding errors. Leadership wanted daily numbers they could trust — and drill into.",
    solution:
      "I built a scheduled ingestion pipeline with Pandas and NumPy that normalises, deduplicates and validates each drop, quarantining bad rows with a reason code instead of failing the batch. Aggregations are materialised into PostgreSQL summary tables so the API answers dashboard queries in milliseconds rather than scanning raw data. Static Matplotlib report packs are generated for the monthly board pack, while the Next.js frontend renders interactive charts for day-to-day use. Every figure links back to the exact source rows that produced it — which is what finally earned the analysts' trust.",
    results:
      "Month-end reporting went from a week of manual work to an automated overnight run, and daily dashboards replaced the stale monthly deck. Data quality issues are now caught at ingestion with a quarantine report instead of being discovered in a board meeting.",
    stack: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Django REST Framework",
      "Next.js",
      "PostgreSQL",
    ],
    metrics: [
      { value: "4M", label: "Rows processed daily" },
      { value: "-87%", label: "Time to monthly report" },
      { value: "14", label: "Live dashboards" },
    ],
    liveUrl: "https://example.com",
    repoUrl: "",
    coverColor: "#0b7a45",
    coverImage: "https://picsum.photos/seed/signalyze/1280/800",
    featured: true,
    published: true,
    sortOrder: 3,
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 4,
    slug: "churnlens-prediction-engine",
    title: "ChurnLens",
    category: "Machine Learning · SaaS",
    year: "2026",
    role: "ML Engineer",
    description:
      "A churn-prediction engine for a subscription business — a PyTorch model served as a REST API with explainable scores.",
    overview:
      "ChurnLens predicts which subscribers of a SaaS product are likely to cancel within the next 30 days, early enough for the retention team to intervene. The model is a PyTorch network trained on behavioural sequences — logins, feature usage, support tickets, billing events — and is served through a DRF endpoint that the company's CRM calls nightly. Each score ships with its top contributing factors, so the retention team knows *why* an account is at risk, not just that it is.",
    challenge:
      "Cancellations looked random to the business: by the time an account went quiet, it was already gone. Historical data was rich but messy, heavily imbalanced (fewer than 4% of accounts churn in any month), and the team had been burned before by a black-box model nobody could act on. Explainability was a hard requirement, not a nice-to-have.",
    solution:
      "I built the feature pipeline in Pandas and SciPy — sessionising raw event logs into weekly behaviour windows — and trained a PyTorch model with a class-weighted loss to handle the imbalance, validated against a time-based split to avoid leakage. Seaborn-powered evaluation notebooks made model behaviour reviewable by non-ML stakeholders. Integrated-gradients attribution produces the top risk factors per account, and the whole thing is packaged behind a versioned DRF endpoint with model artefacts tracked and reproducible.",
    results:
      "The model reached 0.91 AUC on a held-out quarter and now scores the full subscriber base nightly in under four minutes. Retention campaigns driven by the scores cut monthly churn measurably in the first two quarters, and the explanation payloads became the retention team's default triage view.",
    stack: [
      "PyTorch",
      "Pandas",
      "NumPy",
      "SciPy",
      "Seaborn",
      "Django REST Framework",
    ],
    metrics: [
      { value: "0.91", label: "AUC on held-out data" },
      { value: "-22%", label: "Monthly churn rate" },
      { value: "4min", label: "Full nightly scoring run" },
    ],
    liveUrl: "",
    repoUrl: "https://github.com/ahmadmalik34",
    coverColor: "#6d28d9",
    coverImage: "https://picsum.photos/seed/churnlens/1280/800",
    featured: true,
    published: true,
    sortOrder: 4,
    createdAt: seededAt,
    updatedAt: seededAt,
  },
  {
    id: 5,
    slug: "estatery-property-marketplace",
    title: "Estatery",
    category: "Frontend · Marketplace",
    year: "2024",
    role: "Frontend Developer",
    description:
      "A property marketplace frontend with map-driven search over 25,000 live listings — built to feel instant.",
    overview:
      "Estatery is the public frontend for a real-estate marketplace: map-driven search, faceted filters, saved searches and listing detail pages for ~25,000 active properties. I owned the frontend rebuild — Next.js with Tailwind CSS and Redux — consuming an existing Django REST API that could not be changed mid-project.",
    challenge:
      "The previous SPA shipped a 2.4 MB bundle, rendered blank while loading, and was effectively invisible to search engines — organic traffic was near zero for listing pages. Filters triggered full refetches that reset the map. The rebuild had to be SEO-first without sacrificing the app-like filtering experience users expected.",
    solution:
      "I moved listing and search pages to server rendering with Next.js, streaming the map shell first and hydrating filters progressively. Filter state lives in the URL — shareable, crawlable, back-button-friendly — with Redux coordinating map viewport and result list so panning the map updates results without a reload. Listing pages generate structured data (JSON-LD) for rich results, and image delivery was rebuilt around responsive sizes with lazy loading. The Tailwind design system replaced 40+ ad-hoc CSS files.",
    results:
      "Load time dropped from over four seconds to under a second on mid-range phones, and Lighthouse performance went from 41 to 98. Indexed listing pages grew by an order of magnitude within two months, and organic search became the site's largest traffic source for the first time.",
    stack: ["Next.js", "Tailwind CSS", "Redux", "Django REST Framework"],
    metrics: [
      { value: "98", label: "Lighthouse performance" },
      { value: "0.9s", label: "Load on mid-range mobile" },
      { value: "25k", label: "Listings served" },
    ],
    liveUrl: "https://example.com",
    repoUrl: "",
    coverColor: "#475569",
    coverImage: "https://picsum.photos/seed/estatery/1280/800",
    featured: false,
    published: true,
    sortOrder: 5,
    createdAt: seededAt,
    updatedAt: seededAt,
  },
];

export const demoSkills: Skill[] = [
  // Web development
  { id: 1, name: "Django", category: "web", icon: "django", sortOrder: 1, createdAt: seededAt },
  { id: 2, name: "Django REST Framework", category: "web", icon: "", sortOrder: 2, createdAt: seededAt },
  { id: 3, name: "React", category: "web", icon: "react", sortOrder: 3, createdAt: seededAt },
  { id: 4, name: "Next.js", category: "web", icon: "nextdotjs", sortOrder: 4, createdAt: seededAt },
  { id: 5, name: "Redux", category: "web", icon: "redux", sortOrder: 5, createdAt: seededAt },
  { id: 6, name: "Tailwind CSS", category: "web", icon: "tailwindcss", sortOrder: 6, createdAt: seededAt },
  { id: 7, name: "Bootstrap", category: "web", icon: "bootstrap", sortOrder: 7, createdAt: seededAt },
  // Data science & ML
  { id: 8, name: "NumPy", category: "data", icon: "numpy", sortOrder: 1, createdAt: seededAt },
  { id: 9, name: "Pandas", category: "data", icon: "pandas", sortOrder: 2, createdAt: seededAt },
  { id: 10, name: "Matplotlib", category: "data", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg", sortOrder: 3, createdAt: seededAt },
  { id: 11, name: "Seaborn", category: "data", icon: "", sortOrder: 4, createdAt: seededAt },
  { id: 12, name: "SciPy", category: "data", icon: "scipy", sortOrder: 5, createdAt: seededAt },
  { id: 13, name: "PyTorch", category: "data", icon: "pytorch", sortOrder: 6, createdAt: seededAt },
  // Languages & tools
  { id: 14, name: "Python", category: "tools", icon: "python", sortOrder: 1, createdAt: seededAt },
  { id: 15, name: "JavaScript", category: "tools", icon: "javascript", sortOrder: 2, createdAt: seededAt },
  { id: 16, name: "PostgreSQL", category: "tools", icon: "postgresql", sortOrder: 3, createdAt: seededAt },
  { id: 17, name: "Git", category: "tools", icon: "git", sortOrder: 4, createdAt: seededAt },
];
