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

type ExperienceType =
  | "full-time"
  | "part-time"
  | "freelancer"
  | "intern"
  | "volunteer";

export interface ExperienceView {
  name: string;
  logo: string;
  role: string;
  type: ExperienceType;
  description: string;
  achievements: Array<string>;
  start: string;
  end: string;
  src: string;
  alt: string;
}

interface EducationUniversity {
  name: string;
  originalName: string;
  abbreviation: string;
}

interface EducationExperience {
  role: string;
  start: string;
  end: string;
  description: string;
}

export interface EducationView {
  title: string;
  abbreviation: string;
  university: EducationUniversity;
  start: string;
  end: string;
  experiences: Array<EducationExperience>;
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
  experiences: Array<ExperienceView>;
  educations: Array<EducationView>;
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
    color: "slate",
    link: "https://www.linkedin.com/in/dev-almeida-matheus/",
  },
  {
    name: "github",
    color: "slate",
    link: "https://github.com/tthheusalmeida",
  },
  {
    name: "whatsapp",
    color: "slate",
    link: "https://wa.me/5538999460104?text=Hi! I’m looking for help with a project and came across your site. Can we talk?",
  },
  {
    name: "gmail",
    color: "slate",
    link: "mailto:dev.almeida.matheus@gmail.com",
  },
];

const softSkills = [
  // "Communication",
  "Teamwork",
  "Problem-solving",
  // "Adaptability",
  // "Critical thinking",
  "Creativity",
  "Open-mindedness",
  "Emotional intelligence",
  "Attention to detail",
  "Empathy",
  // "Growth mindset",
  // "Active listening",
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
      "SWR",
    ],
    image: "/projects/melhor_preco_app.webp",
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
    image: "/projects/vmt.webp",
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
    image: "/projects/proffy.webp",
    link: "https://github.com/tthheusalmeida/proffy",
    categories: ["personal"],
  },
  {
    title: "Finance.AI",
    about: `Project that helps users manage their personal finances. 
      Finance.AI uses artificial intelligence to analyze transactions and generate 
      personalized insights. On the platform, users can register income and expenses, 
      categorize movements, and view smart summaries to better understand their budget.`,
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Tailwind",
      "Clerk",
      "PostgreSQL",
      "Gemini",
      "Zod",
    ],
    image: "/projects/finance-ai.webp",
    link: "https://github.com/tthheusalmeida/finance-ai",
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
    image: "/projects/recipe.webp",
    link: "https://recipe-five-rust.vercel.app/",
    categories: ["personal"],
  },
  {
    title: "Zelda Project",
    about:
      "Personal project to practice lading page with video and iframe tag.",
    technologies: ["HTML", "CSS", "Javascript"],
    image: "/projects/zelda_project.webp",
    link: "https://zelda-project.vercel.app/",
    categories: ["personal"],
  },
];

const experiences: ExperienceView[] = [
  {
    name: "Blip",
    logo: "/work/blip.svg",
    role: "Software Engineer",
    type: "full-time",
    description:
      "Revamped a complex legacy system to boost performance, scalability, and client efficiency through code cleanup, tech migration, security improvements, and AI integration.",
    achievements: [
      "Removed 20+ outdated feature flags, simplifying the codebase",
      "Introduced generative AI features, reducing manual client work by up to 60%",
      "Migrated critical routes from Python 2 to Python 3, ensuring long-term stability",
      "Refactored legacy components into Vue.js, resolving memory leaks and improving load times",
      "Implemented Google reCAPTCHA, strengthening security",
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
    type: "full-time",
    description:
      "Improved dashboard usability and delivery speed by building dynamic filters, automating real-time updates, and developing modular components.",
    achievements: [
      "Developed 70+ reusable components in a single quarter",
      "Built global filters that cut setup time by up to 80%",
      "Created a component builder to increase product flexibility",
      "Improved Firebase security rules and optimized data structure",
      "Strengthened the design system with test coverage and documentation",
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
    type: "full-time",
    description:
      "Contributed to scalable product development by designing advanced Vue.js components, improving Firebase access control, and supporting a consistent, accessible design system.",
    achievements: [
      "Built components that enhanced data visualization and reusability",
      "Managed Firebase permissions and improved security practices",
      "Increased test coverage, reducing production bugs",
      "Contributed to the evolution of a reusable design system",
      "Accelerated feature delivery through modular, maintainable code",
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
    type: "intern",
    description:
      "Laid the groundwork for scalable front-end development by applying Vue.js principles to build maintainable components and improve code quality.",
    achievements: [
      "Created modular Vue.js components focused on reusability and clarity",
      "Applied lifecycle methods and reactivity to improve interactivity",
      "Structured the codebase for maintainability and collaboration",
      "Contributed to improving code quality and consistency",
      "Gained hands-on experience in front-end development within a fast-paced team",
    ],
    start: "01/09/2020",
    end: "01/06/2021",
    src: "/work/stilingue-intern.jpeg",
    alt: "Stilingue Off Site",
  },
];

const educations = [
  {
    title: "Bachelor of Computer Science",
    abbreviation: "BSc",
    university: {
      name: "Federal University of Ouro Preto",
      originalName: "Universidade Federal de Ouro Preto",
      abbreviation: "UFOP",
    },
    start: "01/08/2018",
    end: "01/04/2025",
    experiences: [
      {
        role: "Teaching Assistant – Data Structures",
        start: "01/09/2019",
        end: "01/03/2020",
        description: `Supported the Data Structures course by creating exercises, reviewing assignments, and assisting students with coding challenges. Topics included algorithm complexity, recursion, lists, stacks, queues, sorting algorithms, binary and AVL trees, and hash tables.`,
      },
      {
        role: "Undergraduate Research – High Performance Computing (HPC)",
        start: "01/08/2019",
        end: "01/09/2019",
        description: `Contributed to the development of JCL-Opt, a Java-based framework that applies optimization techniques like backtracking and permutations on distributed systems using JCL. Focused on modular design, load balancing, and efficient data handling strategies.`,
      },
      {
        role: "Participant – opCod3rs Program",
        start: "31/08/2018",
        end: "28/06/2019",
        description: `Took part in a competitive programming training program aimed at preparing students for algorithmic challenges and ICPC-style contests. Regularly practiced advanced data structures, dynamic programming, and graph theory through weekly problem-solving sessions.`,
      },
    ],
  },
];

const testimonials = [
  {
    name: "João Marcos",
    src: "https://media.licdn.com/dms/image/v2/D4D03AQHe_O4gnMONaw/profile-displayphoto-scale_100_100/B4DZgLS3T3H0Ao-/0/1752536152657?e=1758153600&v=beta&t=OkJytMvSNR6967L1X8TlGZUIVccexmGCaU4_dIrepRM",
    role: "Front-end Engineering | Tech Lead | Chapter Lead",
    descriptions: `I’ve had the pleasure of witnessing Matheus’ professional journey since 
      his early days in the tech field, and I’ve always been impressed by how quickly and 
      deeply he learns.
      He approaches challenges with an open and collaborative mindset. Even when he’s not 
      the most senior person on the team, he consistently steps up to support both projects 
      and teammates.
      Matheus is someone who’s always seeking to grow — whether by learning from his colleagues, 
      reflecting on his own work, or understanding the broader impact of the products he helps 
      build. On top of that, he maintains excellent interpersonal relationships and contributes 
      to a positive team dynamic.
      In a market where effective results through technology are increasingly sought, Matheus is 
      the kind of professional you can rely on. Whenever I have the opportunity, I invite him to 
      join my projects.
    `,
  },
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
  {
    name: "Levi Frota",
    src: "https://media.licdn.com/dms/image/v2/D4D03AQGT_rpAqZTC_w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1701872417783?e=2147483647&v=beta&t=BeDd6sJkqbDtvLhf6dtp6Zo-rQ9HKb03y6n-JDa5N9s",
    role: "Front-End Developer",
    descriptions: `Matheus is one of the greatest developers I have worked with. He has great tech 
      skills and is a team player, helping his coworkers and contributing to a better workplace. Also, 
      he's an excellent problem solver, and helped the team to improve our platforms with good 
      performance and clean code. I hope we can work together again sometime.
    `,
  },
  {
    name: "Caio Costa",
    src: "https://media.licdn.com/dms/image/v2/C4E03AQE9lA1rTv5BSg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1583380974056?e=2147483647&v=beta&t=k0UssbUfQmtGmi_h3jJvurV89RoiTADKUNoalopcja0",
    role: "Data Engineer",
    descriptions: `I had the pleasure of studying alongside Matheus. From the beginning, it was clear 
      that he stood out for his technical skills, critical thinking, and collaborative spirit. He 
      consistently approached problems with creativity and was always willing to help others grasp 
      complex topics. Whether working on academic projects or exploring personal tech interests, he 
      brought a strong work ethic and a passion for learning that made him a valuable friend during 
      the period we studied together and the years after.
    `,
  },
];

const VIEW: ViewProps = {
  stack,
  socialMedia,
  softSkills,
  projects,
  experiences,
  educations,
  testimonials,
};

export default VIEW;
