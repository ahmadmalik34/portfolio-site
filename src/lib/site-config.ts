export const siteConfig = {
  name: "Muhammad Ahmad",
  firstName: "Muhammad",
  initials: "MA",
  role: "Full-Stack Web Developer",
  headline: ["FULL-STACK", "DEVELOPER"],
  tagline:
    "I design and build fast, reliable web products — Django & DRF on the backend, React & Next.js on the frontend, and PyTorch when the data gets interesting.",
  email: "m.ahmadmalik03@gmail.com",
  location: "Pakistan",
  timezone: "PKT · UTC+5",
  availability: "Available for freelance & full-time",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    linkedin: "https://linkedin.com/in/ahmadmalik34",
    github: "https://github.com/ahmadmalik34",
    whatsapp: "https://wa.me/923035082823",
  },
  stats: [
    { value: "03+", label: "Years of experience" },
    { value: "12+", label: "Projects shipped" },
    { value: "14", label: "Technologies mastered" },
  ],
  services: [
    {
      title: "API Design & Development",
      description:
        "Robust REST APIs with Django REST Framework — versioned, documented, tested, and built to scale.",
    },
    {
      title: "Full-Stack Web Applications",
      description:
        "End-to-end products: PostgreSQL schemas, Django services, and React/Next.js frontends that ship.",
    },
    {
      title: "Frontend Engineering",
      description:
        "Pixel-accurate, accessible interfaces with Next.js, Tailwind CSS and Redux state done right.",
    },
    {
      title: "Data Analysis & ML",
      description:
        "From Pandas pipelines to PyTorch models — turning raw data into decisions and deployed endpoints.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
