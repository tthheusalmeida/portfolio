export type ExperienceType =
  | "full-time"
  | "part-time"
  | "freelancer"
  | "owner"
  | "intern"
  | "volunteer"
  | "self-employed";

export interface ExperienceRole {
  role: string;
  type: ExperienceType;
  start: string;
  end: string | null;
}

// One entry per company. `roles` is ordered from the most recent to the
// oldest, and the description, achievements and highlights belong to the
// company as a whole.
export interface ExperienceInterface {
  name: string;
  logo: string | null;
  description: string | null;
  achievements: Array<string>;
  highlights: Array<string>;
  roles: Array<ExperienceRole>;
  src: string | null;
  alt: string | null;
}

export const experiences: ExperienceInterface[] = [
  {
    name: "Ouro Preto State School",
    logo: null,
    description: null,
    achievements: [
      "Taught Computer Science and Systems Development subjects for high school technical education students.",
      "Delivered practical and theoretical lessons covering programming, software development, computer networks, systems architecture, operating systems, and software maintenance.",
      "Designed hands-on activities and technical exercises to develop students' problem-solving, programming, and systems thinking skills.",
      "Introduced software development concepts including object-oriented programming, algorithms, application development, and software architecture.",
      "Developed teaching materials, exercises, and assessments adapted to students' technical level and learning objectives.",
    ],
    highlights: [
      "Mentoring in programming, data structures and software fundamentals",
      "Clear technical communication: turning complex topics into practical learning",
      "Own teaching materials, exercises and assessments",
    ],
    roles: [
      {
        role: "Computer Science & Systems Development Teacher",
        type: "full-time",
        start: "01/09/2026",
        end: null,
      },
    ],
    src: null,
    alt: null,
  },
  {
    name: "Humanamente",
    logo: "/work/humanamente.png",
    description: null,
    achievements: [
      "Led the development of the Humanamente SaaS platform, defining the application UI/UX, architecture, APIs, and infrastructure",
      "Built the application using implementing a multi-tenant architecture with Role-Based Access Control (RBAC).",
      "Developed security mechanisms including encryption, data anonymization, and sensitive data validation to ensure LGPD compliance.",
      "Implemented automated backup and disaster recovery routines to improve platform reliability.",
      "Leveraged Generative AI to accelerate software development, documentation, and code refactoring.",
      "Established observability with Prometheus and Grafana for platform monitoring and diagnostics.",
    ],
    highlights: [
      "Multi-tenant SaaS with RBAC",
      "LGPD-compliant security and encryption",
      "Observability with Prometheus & Grafana",
    ],
    roles: [
      {
        role: "Co-Founder & Lead Software Engineer",
        type: "self-employed",
        start: "01/03/2026",
        end: "01/10/2026",
      },
    ],
    src: null,
    alt: null,
  },
  {
    name: "Convenia",
    logo: "/work/convenia.png",
    description: "Supported the evolution of the HR platform by maintaining core features, resolving technical debt, and modernizing the front-end architecture through Vue.js upgrades and AI-assisted development.",
    achievements: [
      "Migrated legacy components from Vue 2 to Vue 3, improving maintainability and long-term scalability",
      "Used AI-assisted workflows to accelerate component updates and development tasks",
      "Acted in product sustainment, resolving production issues and handling support tickets",
      "Fixed critical bugs and improved overall system reliability",
      "Addressed technical debt to stabilize the codebase and improve development velocity",
    ],
    highlights: [
      "Vue 2 → Vue 3 migration",
      "Critical production bugs fixed",
      "Technical debt reduced",
    ],
    roles: [
      {
        role: "Front-End Developer",
        type: "full-time",
        start: "01/12/2025",
        end: "01/03/2026",
      },
    ],
    src: null,
    alt: null,
  },
  {
    name: "MelhorPreço.app",
    logo: "/work/melhorprecoapp.png",
    description: "Evolved the shared lists app, focusing on usability, performance, and overall system stability.",
    achievements: [
      "Improved navigation efficiency and smoother app performance",
      "Enhanced user experience, with more intuitive and visually consistent interaction",
      "Boosted stability and responsiveness, reducing network overhead",
      "Strengthened collaboration among users through the new shared lists features",
      "Implemented cache-control headers on the backend to reduce API response time and enhance performance",
    ],
    highlights: [
      "Faster navigation and performance",
      "New shared lists features",
      "Cache-control cut API response time",
    ],
    roles: [
      {
        role: "FrontEnd Engineer",
        type: "full-time",
        start: "01/04/2025",
        end: "01/12/2025",
      },
    ],
    src: null,
    alt: null,
  },
  {
    name: "Blip",
    logo: "/work/blip.svg",
    description: "Revamped a complex legacy system to boost performance, scalability, and client efficiency through code cleanup, tech migration, security improvements, and AI integration.",
    achievements: [
      "Removed 20+ outdated feature flags, simplifying the codebase",
      "Introduced generative AI features, reducing manual client work by up to 60%",
      "Migrated critical routes from Python 2 to Python 3, ensuring long-term stability",
      "Refactored legacy components into Vue.js, resolving memory leaks and improving load times",
      "Implemented XSS mitigation by blocking malicious scripts, protecting users and improving system security.",
    ],
    highlights: [
      "Up to 60% less manual work with AI",
      "Python 2 → 3 migration",
      "20+ feature flags removed",
    ],
    roles: [
      {
        role: "Software Engineer",
        type: "full-time",
        start: "01/01/2023",
        end: "01/04/2025",
      },
    ],
    src: "/work/blip-meet-up.webp",
    alt: "Blip meet up",
  },
  {
    name: "Stilingue",
    logo: "/work/stilingue.svg",
    description: "Grew from intern to junior front-end developer, building a reusable Vue.js design system, dashboards with dynamic filters and Firebase security rules.",
    achievements: [
      "Developed 70+ reusable components in a single quarter",
      "Built global filters that cut setup time by up to 80%",
      "Created a component builder to increase product flexibility",
      "Improved Firebase security rules and optimized data structure",
      "Increased test coverage, reducing production bugs, and strengthened the design system with documentation",
    ],
    highlights: [
      "70+ reusable components in one quarter",
      "Up to 80% faster filter setup",
      "Component builder",
    ],
    roles: [
      {
        role: "Junior Front-End Developer",
        type: "full-time",
        start: "01/02/2022",
        end: "01/01/2023",
      },
      {
        role: "Assistant Front-End Developer",
        type: "full-time",
        start: "01/06/2021",
        end: "01/02/2022",
      },
      {
        role: "Developer Intern",
        type: "intern",
        start: "01/09/2020",
        end: "01/06/2021",
      },
    ],
    src: "/work/stilingue-off-site.webp",
    alt: "Stilingue Off Site",
  },
];
