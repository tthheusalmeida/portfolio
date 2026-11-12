import type { Lang } from "@/i18n/dictionary";
import type { CvContact, CvLanguage } from "../types";

// Everything that exists only in the CV (it is not shown on the portfolio).
// "{years}" in the summary is replaced by the years of experience computed
// from the experiences, so it never gets outdated.

export interface CvProfile {
  contact: CvContact;
  summary: Array<string>;
  // Bulleted results, the first thing a recruiter should see.
  mainResults: Array<string>;
  languages: Array<CvLanguage>;
  fileName: string;
}

const CONTACT = {
  name: "Matheus Almeida",
  phone: "+55 38 9 9946 0104",
  email: "dev.almeida.matheus@gmail.com",
  linkedin: "https://www.linkedin.com/in/dev-almeida-matheus/",
  portfolio: "https://almeida-matheus.com",
  objective: "Full Stack | Software Engineer | DevOps | Vue.js & TypeScript",
};

export const CV_PROFILE: Record<Lang, CvProfile> = {
  en: {
    contact: {
      ...CONTACT,
      location: "Ouro Preto, Minas Gerais / Brazil",
      availability: "Available for travel and relocation",
    },
    summary: [
      "I am a Software Engineer with {years}+ years of experience building scalable web applications, with strong expertise in the Vue.js ecosystem, TypeScript, JavaScript and modern front-end architectures. I have hands-on experience with reusable component architectures, Design Systems, state management, RESTful API integration, automated testing, accessibility, UX/UI, SEO and performance optimization, as well as React, Next.js, SPA and SSG applications. I also work across the stack with Node.js, NestJS, PostgreSQL, Firebase, Docker, CI/CD, observability, authentication and RBAC.",
      "I am a results-oriented engineer who enjoys working autonomously and collaboratively with engineering, product, and design teams to build reliable, performant, and user-centered products.",
    ],
    mainResults: [
      "Led the development of a multi-tenant SaaS platform for psychosocial risk management and occupational health compliance.",
      "Built a global filtering system that reduced dashboard setup time by 80% and increased the number of customers served per day by 5x.",
      "Developed over 70 dashboard components in one quarter, expanding analytical capabilities while maintaining visual consistency.",
      "Implemented a component builder that eliminated manual tasks and reduced component production time by 99%, accelerating deliveries and increasing autonomy.",
      "Introduced post analysis with generative AI, reducing manual customer tasks by 60% and increasing operational efficiency.",
      "Migrated backend routes from Python 2 to Python 3, ensuring long-term maintenance and security.",
      "Refactored front-end modules to Vue.js, fixing memory leaks and optimizing performance and loading time.",
    ],
    languages: [
      { name: "Portuguese", level: "Native" },
      {
        name: "English",
        level: "C1 (Advanced) | Professional Working Proficiency",
      },
    ],
    fileName: "Matheus_Almeida_CV_EN_Software_Engineer.pdf",
  },
  pt: {
    contact: {
      ...CONTACT,
      location: "Ouro Preto, Minas Gerais / Brasil",
      availability: "Disponível para viagens e mudanças",
    },
    summary: [
      "Sou Engenheiro de Software com mais de {years} anos de experiência construindo aplicações web escaláveis, com forte domínio do ecossistema Vue.js, TypeScript, JavaScript e arquiteturas front-end modernas. Tenho experiência prática em arquiteturas de componentes reutilizáveis, Design Systems, gerenciamento de estado, integração de APIs RESTful, testes automatizados, acessibilidade, UX/UI, SEO e otimização de desempenho, além de React, Next.js e aplicações SPA e SSG. Também atuo em toda a stack com Node.js, NestJS, PostgreSQL, Firebase, Docker, CI/CD, observabilidade, autenticação e RBAC.",
      "Sou um engenheiro orientado a resultados, que gosta de trabalhar de forma autônoma e colaborativa com times de engenharia, produto e design para construir produtos confiáveis, performáticos e centrados no usuário.",
    ],
    mainResults: [
      "Liderei o desenvolvimento de uma plataforma SaaS multi-tenant para gestão de riscos psicossociais e conformidade em saúde ocupacional.",
      "Construí um sistema de filtros globais que reduziu em 80% o tempo de configuração de dashboards e aumentou em 5x o número de clientes atendidos por dia.",
      "Desenvolvi mais de 70 componentes de dashboard em um trimestre, ampliando a capacidade analítica e mantendo a consistência visual.",
      "Implementei um construtor de componentes que eliminou tarefas manuais e reduziu em 99% o tempo de produção de componentes, acelerando entregas e aumentando a autonomia.",
      "Introduzi a análise de posts com IA generativa, reduzindo em 60% as tarefas manuais dos clientes e aumentando a eficiência operacional.",
      "Migrei rotas de backend de Python 2 para Python 3, garantindo manutenção e segurança a longo prazo.",
      "Refatorei módulos de front-end para Vue.js, corrigindo vazamentos de memória e otimizando desempenho e tempo de carregamento.",
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      {
        name: "Inglês",
        level: "C1 (Avançado) | Proficiência profissional",
      },
    ],
    fileName: "Matheus_Almeida_CV_PT_Engenheiro_de_Software.pdf",
  },
};
