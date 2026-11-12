import type { CvExperienceContentMap } from "./experienceContent";

export const EXPERIENCE_CONTENT_EN: CvExperienceContentMap = {
  "Ouro Preto State School": {
    roles: [
      {
        bullets: [
          "Teach Computer Science and Systems Development to high school technical education students: programming, software architecture, networks and operating systems.",
          "Design hands-on activities, teaching materials and assessments that build problem-solving and systems thinking.",
          "Introduce object-oriented programming, algorithms and application development.",
        ],
      },
    ],
  },
  Humanamente: {
    company: "Humanamente Saúde Mental Corporativa LTDA",
    roles: [
      {
        bullets: [
          "Led the end-to-end development of a multi-tenant SaaS platform, defining architecture, APIs, and infrastructure.",
          "Implemented observability with Prometheus and Grafana, improving monitoring and troubleshooting.",
          "Strengthened platform security with encryption, anonymization, and LGPD-compliant data protection.",
          "Built scalable features with Vue 3, TypeScript, NestJS, PostgreSQL, and RBAC.",
          "Increased platform reliability through automated backup and disaster recovery.",
          "Delivered dynamic forms, analytics dashboards, and Google SSO authentication.",
          "Leveraged Generative AI to accelerate feature delivery, documentation, and code refactoring.",
        ],
        technologies: [
          "Vue 3", "TypeScript", "NestJS", "Node.js", "PostgreSQL", "Prisma", "Docker", "NGINX", "Prometheus", "Grafana",
          "RBAC", "Multi-Tenant", "Generative AI", "Firebase", "Pinia", "Vite", "Vue Router", "Composition API", "Vitest", "Jest", "REST APIs",
          "Component Architecture", "Design Systems", "UX/UI", "Accessibility", "SEO", "Performance Optimization", "Shadcn", "ESLint", "Prettier",
        ],
      },
    ],
  },
  Convenia: {
    roles: [
      {
        bullets: [
          "Owned the migration of Vue 2 components to Vue 3 within a Nuxt-based application.",
          "Modernized front-end components while maintaining application stability and compatibility during the migration.",
          "Improved code maintainability and front-end architecture through the adoption of modern Vue 3 patterns.",
        ],
        technologies: ["Vue 2", "Vue 3", "Nuxt", "JavaScript", "Vitest", "Playwright", "Docker", "AWS"],
      },
    ],
  },
  "MelhorPreço.app": {
    roles: [
      {
        bullets: [
          "Implemented cache-control headers in the backend to reduce API response time and improve performance.",
          "Improved stability and responsiveness, reducing network overhead.",
          "Improved navigation efficiency and application performance.",
          "Enhanced collaboration between users through the new shared lists feature.",
          "Enhanced user experience, with more intuitive and visually consistent interactions.",
        ],
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Jest", "Node.js", "PostgreSQL", "Firebase"],
      },
    ],
  },
  Blip: {
    company: "Take Blip",
    roles: [
      {
        bullets: [
          "Developed a generative AI solution for extracting insights from social networks, reducing manual customer tasks by 60% and the manual effort of analysts.",
          "Participated in the migration of routes from Python 2 to Python 3, ensuring the continuity and modernization of the system.",
          "Removed over 20 obsolete feature flags, optimizing the codebase and making it easier to maintain.",
          "Refactored legacy components to Vue.js, fixing memory leaks and significantly improving performance and loading times.",
          "Implemented Google reCAPTCHA in the login flow to strengthen security against automated attacks.",
          "Contributed to the modernization of the company's main legacy system.",
        ],
        technologies: ["Vue.js", "JavaScript", "jQuery", "Handlebars", "HTML", "CSS", "Python", "GCP", "reCAPTCHA", "Git", "CI/CD", "Design System"],
      },
    ],
  },
  Stilingue: {
    roles: [
      {
        bullets: [
          "Created a global filtering system that reduced dashboard setup time by 80%, increased the customers served per day by 5x and reduced churn among strategic accounts.",
          "Developed over 70 reusable UI components in a single quarter, accelerating the product team's productivity.",
          "Built a component generator that reduced component production time by 99% and let users autonomously customize dashboards.",
          "Automated dashboard updates using Firebase, ensuring data consistency with newly added components.",
        ],
        technologies: ["Vue.js", "Firebase", "JavaScript", "Jest", "HTML", "CSS", "Design System", "UX"],
      },
      {
        bullets: [
          "Developed complex Vue.js components for dashboards and internal tools, enhancing visualization and interactivity.",
          "Managed Firebase authentication and access control, ensuring secure and scalable user management.",
          "Wrote unit and integration tests with Jest, increasing the reliability of deployments.",
          "Contributed to the Design System, implementing accessible, consistent and easily maintainable UI components.",
        ],
        technologies: ["Vue.js", "Vuetify", "Firebase", "Jest", "Front-End Testing", "UI Components", "Maintainability", "Scalability"],
      },
      {
        bullets: [
          "Developed reusable Vue.js components, applying best practices for communication and responsiveness.",
          "Implemented lifecycle methods and reactive data flows for dynamic user interface updates.",
          "Supported the organization and structure of the project, improving maintainability and onboarding for new developers.",
        ],
        technologies: ["Vue.js", "Vuex", "JavaScript", "Component Architecture", "Front-End Development", "Reusability"],
      },
    ],
  },
};
