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
    "Computer Science graduate skilled in web application development with React.js on the front end and Django on the back end. Proficient in building RESTful APIs, managing databases, and creating interactive UI components. Committed to writing maintainable code and continuously improving through real-world development experience.",
  experience: [
    {
      company: "CloudTHQ",
      role: "Frontend Web Developer Intern",
      period: "Jun 2025 — Aug 2025",
      bullets: [
        "Developed responsive logistics dashboards with real-time shipment tracking and multi-layout navigation, improving user satisfaction and retention.",
        "Built and maintained enterprise web applications using React TypeScript, Material-UI and Vite, delivering scalable business solutions for cargo management workflows.",
        "Collaborated in an Agile team environment, contributing to sprint planning, code reviews, and deployment of production features.",
      ],
    },
  ],
  projects: [
    {
      name: "AI-Powered Multilingual Video Translation System",
      meta: "Django & React · Final Year Project",
      bullets: [
        "Built a full-stack AI video translation platform using a React 19 + Vite frontend and Django REST Framework backend, enabling users to upload videos, translate spoken content between English and Urdu, and download voice-cloned audio — all with real-time progress tracking via polling-based updates.",
        "Integrated state-of-the-art deep learning models including Meta's SeamlessM4T v2 Large (~9.7 GB) for direct speech-to-speech translation preserving prosody and emotion, OpenVoice v2 for voice cloning via tone color conversion with 256-dimensional speaker embeddings, and Silero VAD for timestamp-accurate speech segmentation.",
        "Engineered a multi-module processing pipeline with FFmpeg-based audio extraction, segment-by-segment voice cloning with tau-controlled intensity, smart silence preservation, and graceful fallback mechanisms — supporting automatic CPU/GPU detection and efficient memory management.",
        "Leveraged AI-assisted development throughout the project for code generation, debugging, architecture decisions, and integration of complex ML model pipelines, accelerating development while maintaining code quality.",
      ],
    },
    {
      name: "Logistics & Cargo Management System",
      meta: "React · Jun 2025 — Aug 2025",
      bullets: [
        "Developed a comprehensive React TypeScript logistics platform with real-time shipment tracking, multi-stage cargo workflow management (destination arrival to final delivery), and AWB search functionality with interactive progress visualization using Material-UI and Vite.",
        "Built a multi-tenant dashboard with role-based permissions featuring staff performance analytics, document generation (PDF/Excel export), delivery note management, and tariff calculation tools with responsive design across three layout modes.",
        "Implemented advanced UI/UX features including dynamic theme switching, context-aware navigation breadcrumbs, comprehensive form management with React Hook Form, and real-time data filtering to enhance user experience across all modules.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelors in Computer Science",
      school: "University of Central Punjab",
      period: "2022 — 2026",
    },
    {
      degree: "FSc Pre-Engineering",
      school: "Punjab Group of Colleges",
      period: "2019 — 2021",
    },
  ],
  skills: [
    "React JS",
    "Django",
    "TailwindCSS",
    "Git/GitHub",
    "Material UI",
    "Bootstrap",
    "TypeScript / JavaScript",
    "Python",
    "C++",
  ],
} as const;
