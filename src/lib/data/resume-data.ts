/**
 * Structured resume content rendered on /resume.
 * The downloadable PDF is managed separately (admin panel or public/docs).
 */
export const resumeData = {
  name: "Muhammad Ahmad",
  title: "Web Developer",
  contacts: [
    { label: "Email", value: "m.ahmadmalik03@gmail.com", href: "mailto:m.ahmadmalik03@gmail.com" },
    { label: "Phone", value: "+92 303 5082823", href: "https://wa.me/923035082823" },
    { label: "GitHub", value: "github.com/ahmadmalik34", href: "https://github.com/ahmadmalik34" },
    { label: "LinkedIn", value: "linkedin.com/in/ahmadmalik34", href: "https://linkedin.com/in/ahmadmalik34" },
  ],
  summary:
    "Final-year Computer Science student with proven skills in React.js and developing expertise in the Django framework. Strong foundation in frontend and backend web development with an emphasis on clean, efficient code and user experience. Passionate about continuous learning and applying new technologies to solve real-world problems through innovative software solutions.",
  experience: [
    {
      company: "CloudTHQ",
      role: "Front-end Web Developer",
      period: "Jun 2025 — Aug 2025",
      bullets: [
        "Ensured user satisfaction and retention by developing responsive logistics dashboards with real-time tracking capabilities and intuitive multi-layout navigation systems.",
        "Built and maintained enterprise web applications using React, TypeScript, Material-UI and modern development frameworks to deliver scalable business solutions.",
      ],
    },
  ],
  projects: [
    {
      name: "Logistics & Cargo Management System",
      meta: "React · TypeScript · Jun 2025 — Aug 2025",
      bullets: [
        "Developed a comprehensive React TypeScript logistics platform with real-time shipment tracking, multi-stage cargo workflow management (destination arrival to final delivery), and AWB search functionality with interactive progress visualization using Material-UI and Vite.",
        "Built a multi-tenant dashboard with role-based permissions featuring staff performance analytics, document generation (PDF/Excel export), delivery note management, and tariff calculation tools with responsive design across three layout modes.",
        "Implemented advanced UI/UX features including dynamic theme switching, context-aware navigation breadcrumbs, comprehensive form management with React Hook Form, and real-time data filtering to enhance user experience across all modules.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      school: "University of Central Punjab",
      period: "2022 — 2026 (Expected)",
    },
    {
      degree: "FSC Pre-Engineering",
      school: "Punjab Group of Colleges",
      period: "2019 — 2021",
    },
  ],
  skills: [
    "React",
    "Django",
    "React Native",
    "Tailwind CSS",
    "Bootstrap",
    "TypeScript / JavaScript",
    "Python",
    "C++",
  ],
} as const;
