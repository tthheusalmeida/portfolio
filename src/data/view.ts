interface StackView {
  name: string;
  color: string;
}

interface SocialMediaView {
  name: string;
  color: string;
  link: string;
}

export interface ProjectView {
  title: string;
  about: string;
  technologies: Array<string>;
  image: string;
  link: string;
}

export interface CompanyView {
  name: string;
  logo: string;
  role: string;
  descriptions: string | Array<string>;
  start: string;
  end: string;
  src: string;
  alt: string;
}

interface TestimonialView {
  name: string;
  src: string;
  role: string;
  descriptions: string;
}

interface ViewProps {
  stack: Array<StackView>;
  socialMedia: Array<SocialMediaView>;
  softSkills: Array<string>;
  projects: Array<ProjectView>;
  companies: Array<CompanyView>;
  testimonials: Array<TestimonialView>;
}

const stack = [
  {
    name: "vue",
    color: "green",
  },
  {
    name: "react",
    color: "cyan",
  },
  {
    name: "ts",
    color: "sky",
  },
  {
    name: "tailwind",
    color: "teal",
  },
  {
    name: "node.js",
    color: "lime",
  },
  {
    name: "firebase",
    color: "amber",
  },
];

const socialMedia = [
  {
    name: "linkedin",
    color: "sky",
    link: "https://www.linkedin.com/in/dev-almeida-matheus/",
  },
  {
    name: "github",
    color: "slate",
    link: "https://github.com/tthheusalmeida",
  },
];

const softSkills = [
  "Communication",
  "Teamwork",
  "Problem-solving",
  "Adaptability",
  "Critical thinking",
  "Creativity",
  "Open-mindedness",
  "Emotional intelligence",
  "Attention to detail",
  "Empathy",
  "Growth mindset",
  "Active listening",
];

const projects = [
  {
    title: "MelhorPreço.app",
    about: `PWA that helps users find the best prices for products across 
      small local markets. Prices are crowd-sourced through a gamified experience 
      where users submit data from nearby stores. Based on these contributions, 
      the platform infers the best price for each item in the closest location.
    `,
    technologies: [
      "React",
      "Next.js",
      "Tailwind",
      "Jest",
      "Firebase",
      "Axios",
      "Zod",
      "SWR"
    ],
    image: "/projects/melhor_preco_app.svg",
    link: "https://www.melhorprecoapp.com.br",
    categories: ["freelancer"],
  },
  {
    title: "Vue Migration Tool (VMT)",
    about: `A CLI tool that automates the migration from Vue 2 to Vue 3 using compiler concepts
    to analyze and transform legacy code based on the latest best practices. Bachelor thesis project.`,
    technologies: [
      "Vue 2",
      "Vue 3",
      "VUE Compiler",
      "Babel",
      "Jest",
      "Node.js",
    ],
    image: "/projects/vmt.svg",
    link: "https://github.com/tthheusalmeida/vue-migration-tool",
    categories: ["personal"],
  },
  {
    title: "Proffy",
    about: `Project that connects students and teachers. 
      Connections aims to find teachers with the best hours to serve students.
      On the platform there is area for students, where you have the option of 
      looking for teachers at the desired times to assist you and area for teachers, 
      where they can register with class schedules.`,
    technologies: ["React", "Knex", "Javascript", "Node.js"],
    image: "/projects/proffy.svg",
    link: "https://github.com/tthheusalmeida/proffy",
    categories: ["personal"],
  },
  {
    title: "Recipe",
    about: ` A recipe website built for my girlfriend using Nuxt.js, Node.js and MongoDB.`,
    technologies: [
      "Vue 3",
      "Nuxt.js",
      "PostCSS",
      "Tailwind",
      "Typescript",
      "Node.js",
    ],
    image: "/projects/recipe.svg",
    link: "https://recipe-five-rust.vercel.app/",
    categories: ["personal"],
  },
  {
    title: "Zelda Project",
    about:
      "Personal project to practice lading page with video and iframe tag.",
    technologies: ["HTML", "CSS", "Javascript"],
    image: "/projects/zelda_project.svg",
    link: "https://zelda-project.vercel.app/",
    categories: ["personal"],
  },
];

const companies = [
  {
    name: "Blip",
    logo: "/work/blip.webp",
    role: "Software Engineer",
    descriptions: [
      "Modernized a critical legacy system, reducing technical complexity and improving maintainability.",
      "Improved performance by refactoring components, removing obsolete code, and reducing memory usage.",
      "Enhanced security by implementing Google reCAPTCHA on the login screen.",
      "Migrated key features from Python 2 to Python 3, ensuring system continuity and compatibility.",
      "Developed generative AI features for social media analysis, automating insights for clients.",
      "Achieved up to 60% reduction in clients manual effort analyzing social content.",
      "Enabled faster delivery of new features by cleaning up the codebase and streamlining the development process.",
    ],
    start: "01/01/2023",
    end: "01/04/2025",
    src: "/work/blip-meet-up.jfif",
    alt: "Blip meet up",
  },
  {
    name: "Stilingue",
    logo: "/work/stilingue.svg",
    role: "Junior Front-End Developer",
    descriptions: [
      "Improved dashboard UX and maintainability as a Junior Front-End Developer.",
      "Created a global filter system to reduce manual configuration and improve usability.",
      "Refactored Firebase data structure and added auto-refresh on login for real-time updates.",
      "Developed 70+ dashboard components in one quarter, supporting various chart types.",
      "Built a custom component builder to increase product flexibility and customization.",
      "Wrote unit tests with Jest and contributed to the design system for consistent UI.",
      "Reduced churn and increased user satisfaction through better performance and UX.",
      "Accelerated delivery with reusable, modular components.",
    ],
    start: "01/02/2022",
    end: "01/01/2023",
    src: "/work/stilingue-off-site.jfif",
    alt: "Stilingue Off Site",
  },
  {
    name: "Stilingue",
    logo: "/work/stilingue.svg",
    role: "Assistant Front-End Developer",
    descriptions: [
      "Built advanced Vue.js components for dashboards and internal products, improving data visualization and control.",
      "Managed Firebase configurations, setting up secure and scalable access permissions.",
      "Wrote unit tests with Jest to increase test coverage and reduce bugs in production.",
      "Contributed to the design system by developing reusable, accessible, and visually consistent components.",
      "Improved internal feature delivery speed with fewer reworks and greater reliability.",
      "Enhanced visual consistency across products, boosting usability and maintainability.",
    ],
    start: "01/06/2021",
    end: "01/02/2022",
    src: "/work/stilingue-assistant.jpeg",
    alt: "Stilingue Off Site",
  },
  {
    name: "Stilingue",
    logo: "/work/stilingue.svg",
    role: "Developer Intern",
    descriptions: [
      "Developed front-end components using Vue.js with a focus on modularity, reusability, and clean communication via props and events.",
      "Implemented lifecycle hooks and reactive data handling to create dynamic, responsive interfaces.",
      "Contributed to the organization and structure of the Vue project, reinforcing core front-end skills.",
      "Improved maintainability and quality of components delivered by the team.",
      "Built a strong technical foundation in modern front-end development with Vue.js.",
    ],
    start: "01/09/2020",
    end: "01/06/2021",
    src: "/work/stilingue-intern.jpeg",
    alt: "Stilingue Off Site",
  },
];

const testimonials = [
  {
    name: "Fábio Gomide",
    src: "https://media.licdn.com/dms/image/v2/D4D03AQFYQ_5UP59Mhw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1721774780020?e=1756944000&v=beta&t=vARqWB5IgM5KntMPOnriEGJjlVpur4HmO5z181yf5ws",
    role: "Senior Product Designer",
    descriptions: `Working with Matheus was an enriching experience.
      Since his very first professional role, his eagerness to learn 
      and overcome challenges has always stood out. I had the privilege 
      of closely following his growth, as we were part of the same team, 
      and I can confidently say: he is relentless. He always gives his best, 
      collaborates excellently, is ready to help, and is constantly seeking new knowledge.

      A great example of this was our many conversations about design—not just product
      design, but design as a discipline. Matheus was one of the key advocates for design 
      quality in our context, always going above and beyond to contribute. His growth is 
      inevitable, and any team would be lucky to have him. A highly recommended professional!
    `,
  },
  {
    name: "Gabriel Caetano Araújo",
    src: "https://media.licdn.com/dms/image/v2/D4D03AQExvcsGhgUcrA/profile-displayphoto-shrink_100_100/B4DZYabxALHAAU-/0/1744200208928?e=1756944000&v=beta&t=_T10Q5IgXNwIFI78NvmdeDt1yMJD41xUACSFMOZhsn8",
    role: "Product Tech Lead",
    descriptions: `Matheus is one of those people who naturally elevate the environment 
      just by being around. Whether solving a problem or helping someone along the way, he 
      brings clarity, focus, and a calm energy that makes everything flow more smoothly. 
      During the time we studied together, I saw firsthand how dedicated he is — not just 
      to the task at hand, but to doing it well, with attention to detail and consistency. 
      He has an energy that inspires and drives those around him. Working with him was always 
      a smooth and motivating experience.
    `,
  },
  {
    name: "Lucas Urzedo",
    src: "https://media.licdn.com/dms/image/v2/C4E03AQFSVYpwxUc_VQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1622288701988?e=1756944000&v=beta&t=tUJF6bprsMhWj8CUInijfVi7iqERI-QWewGJiAUlzCM",
    role: "DataOps Engineer",
    descriptions: `Matheus has excellent technical skills, the ability to solve complex
      problems, great strategic vision and leadership. Also, has qualities as a person, 
      fundamental in any organization, such as communication skills, resilience and always 
      willing to help. We graduated college together and I believe that Matheus has all the 
      conditions to develop further in his career, constituting an asset of enormous value 
      for any organization.
    `,
  },
];

const VIEW: ViewProps = {
  stack,
  socialMedia,
  softSkills,
  projects,
  companies,
  testimonials,
};

export default VIEW;
