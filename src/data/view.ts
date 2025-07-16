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
  description: string;
  achievements: Array<string>;
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

const companies = [
  {
    name: "Blip",
    logo: "/work/blip.svg",
    role: "Software Engineer",
    description:
      "Improved a complex legacy system by cleaning the codebase, migrating technology, enhancing security, and adding AI features boosting performance, scalability, and client efficiency.",
    achievements: [
      "Removed 20+ obsolete feature flags, simplifying the codebase",
      "Reduce client manual work by up to 60% with generative AI features",
      "Migrated critical routes from Python 2 to Python 3, ensuring compatibility",
      "Refactored legacy components to Vue.js, fixing memory leaks and improving load times",
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
    description:
      "Improved dashboard usability and maintainability by building dynamic filters, automating real-time updates, and creating modular components, reducing client churn and boosting internal delivery speed.",
    achievements: [
      "Developed 70+ reusable components in a single quarter",
      "Built global filters, cutting setup time by up to 80%",
      "Create component builder increasing product flexibility",
      "Improved Firebase security and data structure",
      "Wrote tests and improved design system",
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
    description:
      "Contributed to scalable product development by creating advanced Vue.js components, improving Firebase management, enhancing test coverage, and maintaining a consistent, accessible design system.",
    achievements: [
      "Developed components improving data visualization",
      "Managed Firebase permissions and security",
      "Increased test coverage, reducing production bugs",
      "Contributed to a reusable design system",
      "Accelerated feature delivery with reusable code",
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
    description:
      "Learned and applied core Vue.js principles to build scalable front-end components, enhancing team code quality and building a solid foundation for growth.",
    achievements: [
      "Created modular Vue.js components",
      "Applied lifecycle and reactivity",
      "Structured project for maintainability",
      "Improved code quality",
      "Gained practical front-end experience",
    ],
    start: "01/09/2020",
    end: "01/06/2021",
    src: "/work/stilingue-intern.jpeg",
    alt: "Stilingue Off Site",
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
  companies,
  testimonials,
};

export default VIEW;
