export type Category = "owner" | "personal" | "freelancer" | "probono";

export interface ProjectInterface {
  title: string;
  about: string;
  technologies: Array<string>;
  image: string;
  link: string;
  categories: Array<Category>;
}

export const projects: ProjectInterface[] = [
  {
    title: "Humanamente",
    about: `Platform developed for Humanamente to help companies comply with NR-1 
    through structured mental health initiatives. Built by psychologists and a 
    software engineer, it enables organizations to assess, monitor, and manage 
    workplace mental health risks.`,
    technologies: [
      "Vue.js",
      "Pinia",
      "Axios",
      "TypeScript",
      "Shadcn/vue",
      "Nest.js",
      "PostgreSQL",
      "Docker",
      "Hostinger",
    ],
    image: "/projects/humanamente.webp",
    link: "https://www.somoshumanamente.com.br",
    categories: ["owner"],
  },
  {
    title: "Jéssica Rodrigues | Psychologist",
    about: `Professional website designed to present psychological services in a 
    clear, welcoming, and accessible way. The platform highlights the therapist’s 
    approach, areas of expertise, and makes it easy for patients to get in touch 
    through an intuitive and responsive interface.`,
    technologies: ["React", "Next.js", "Tailwind", "TypeScript", "Hostinger"],
    image: "/projects/jessica_rodrigues_psychologist.webp",
    link: "https://psijessicar.com/",
    categories: ["freelancer"],
  },
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
    title: "Room.IO",
    about: ` Roomio is an online multiplayer gaming platform with real-time integration with Web Socket.`,
    technologies: [
      "Next.js",
      "Firebase",
      "Tailwind",
      "SWR",
      "Jest",
      "Socket.IO",
      "Node.js",
      "Express",
      "PostgreSQL",
    ],
    image: "/projects/room_io.webp",
    link: "https://roomio-rust.vercel.app/",
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
    title: "Process Flow",
    about: `Visual workflow builder, similar to n8n, to map and control company processes.
    Processes, subprocesses, tools and owners are nodes in an interactive graph built
    with React Flow, with drag-and-drop editing. Full-stack study case, with a
    Next.js front end and a NestJS REST API.`,
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Tailwind",
      "Shadcn/ui",
      "React Flow",
      "SWR",
      "NestJS",
      "Swagger",
      "Jest",
    ],
    image: "/projects/process_flow.webp",
    link: "https://github.com/tthheusalmeida/process-flow-front",
    categories: ["personal"],
  },
  {
    title: "Homelab",
    about: `Local and frontier AI lab running on my home server. Local models handle tasks
    like video transcription (Whisper) and summarization through back-end jobs, while
    frontier models like Gemini cover chat and summaries. A dashboard creates,
    inspects and tracks everything, on top of a NestJS REST API.`,
    technologies: [
      "React",
      "Vite",
      "Typescript",
      "Tailwind",
      "Shadcn/ui",
      "TanStack Query",
      "Recharts",
      "NestJS",
      "Gemini",
    ],
    image: "/projects/homelab.webp",
    link: "https://github.com/tthheusalmeida/homelab-front",
    categories: ["personal"],
  },
  {
    title: "File Styled Directory",
    about: `Chrome extension that applies custom CSS styles to the browser's local
    file directory listing, turning the plain default page into a clean dark UI.`,
    technologies: ["HTML", "CSS", "Javascript", "Chrome Extension"],
    image: "/projects/file_styled_directory.webp",
    link: "https://github.com/tthheusalmeida/file-styled-directory",
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
    title: "Zelda Project",
    about:
      "Personal project to practice lading page with video and iframe tag.",
    technologies: ["HTML", "CSS", "Javascript"],
    image: "/projects/zelda_project.webp",
    link: "https://zelda-project.vercel.app/",
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
];
