import type { CvExperienceContentMap } from "./experienceContent";

export const EXPERIENCE_CONTENT_PT: CvExperienceContentMap = {
  // The portuguese data renames this experience, so the key is the pt name.
  "Escola Estadual de Ouro Preto": {
    roles: [
      {
        bullets: [
          "Leciono Informática e Desenvolvimento de Sistemas para alunos do ensino técnico de nível médio: programação, arquitetura de software, redes e sistemas operacionais.",
          "Elaboro atividades práticas, materiais didáticos e avaliações que desenvolvem a resolução de problemas e o pensamento sistêmico.",
          "Apresento programação orientada a objetos, algoritmos e desenvolvimento de aplicações.",
        ],
      },
    ],
  },
  Humanamente: {
    company: "Humanamente Saúde Mental Corporativa LTDA",
    roles: [
      {
        bullets: [
          "Liderei o desenvolvimento ponta a ponta de uma plataforma SaaS multi-tenant, definindo arquitetura, APIs e infraestrutura.",
          "Implementei observabilidade com Prometheus e Grafana, melhorando o monitoramento e o diagnóstico de problemas.",
          "Reforcei a segurança da plataforma com criptografia, anonimização e proteção de dados em conformidade com a LGPD.",
          "Construí funcionalidades escaláveis com Vue 3, TypeScript, NestJS, PostgreSQL e RBAC.",
          "Aumentei a confiabilidade da plataforma com backup automatizado e recuperação de desastres.",
          "Entreguei formulários dinâmicos, dashboards analíticos e autenticação com Google SSO.",
          "Utilizei IA Generativa para acelerar entregas, documentação e refatoração de código.",
        ],
        technologies: [
          "Vue 3", "TypeScript", "NestJS", "Node.js", "PostgreSQL", "Prisma", "Docker", "NGINX", "Prometheus", "Grafana",
          "RBAC", "Multi-Tenant", "IA Generativa", "Firebase", "Pinia", "Vite", "Vue Router", "Composition API", "Vitest", "Jest", "REST APIs",
          "Arquitetura de Componentes", "Design Systems", "UX/UI", "Acessibilidade", "SEO", "Otimização de Desempenho", "Shadcn", "ESLint", "Prettier",
        ],
      },
    ],
  },
  Convenia: {
    roles: [
      {
        bullets: [
          "Conduzi a migração de componentes Vue 2 para Vue 3 em uma aplicação baseada em Nuxt.",
          "Modernizei componentes front-end mantendo a estabilidade e a compatibilidade da aplicação durante a migração.",
          "Melhorei a manutenibilidade do código e a arquitetura front-end com a adoção de padrões modernos do Vue 3.",
        ],
        technologies: ["Vue 2", "Vue 3", "Nuxt", "JavaScript", "Vitest", "Playwright", "Docker", "AWS"],
      },
    ],
  },
  "MelhorPreço.app": {
    roles: [
      {
        bullets: [
          "Implementei cabeçalhos de cache-control no backend para reduzir o tempo de resposta da API e melhorar o desempenho.",
          "Aumentei a estabilidade e a responsividade, reduzindo o tráfego de rede.",
          "Melhorei a eficiência da navegação e o desempenho do aplicativo.",
          "Fortaleci a colaboração entre usuários com a nova funcionalidade de listas compartilhadas.",
          "Aprimorei a experiência do usuário, com interações mais intuitivas e visualmente consistentes.",
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
          "Desenvolvi uma solução de IA generativa para extrair insights de redes sociais, reduzindo em 60% as tarefas manuais dos clientes e o esforço manual dos analistas.",
          "Participei da migração de rotas de Python 2 para Python 3, garantindo a continuidade e a modernização do sistema.",
          "Removi mais de 20 feature flags obsoletas, otimizando a base de código e facilitando sua manutenção.",
          "Refatorei componentes legados para Vue.js, corrigindo vazamentos de memória e melhorando significativamente o desempenho e os tempos de carregamento.",
          "Implementei o Google reCAPTCHA no fluxo de login para reforçar a segurança contra ataques automatizados.",
          "Contribuí para a modernização do principal sistema legado da empresa.",
        ],
        technologies: ["Vue.js", "JavaScript", "jQuery", "Handlebars", "HTML", "CSS", "Python", "GCP", "reCAPTCHA", "Git", "CI/CD", "Design System"],
      },
    ],
  },
  Stilingue: {
    roles: [
      {
        bullets: [
          "Criei um sistema de filtros globais que reduziu em 80% o tempo de configuração de dashboards, aumentou em 5x os clientes atendidos por dia e reduziu o churn de contas estratégicas.",
          "Desenvolvi mais de 70 componentes de UI reutilizáveis em um único trimestre, acelerando a produtividade do time de produto.",
          "Construí um gerador de componentes que reduziu em 99% o tempo de produção de componentes e permitiu aos usuários personalizar dashboards de forma autônoma.",
          "Automatizei atualizações de dashboards com Firebase, garantindo a consistência dos dados com os novos componentes.",
        ],
        technologies: ["Vue.js", "Firebase", "JavaScript", "Jest", "HTML", "CSS", "Design System", "UX"],
      },
      {
        bullets: [
          "Desenvolvi componentes Vue.js complexos para dashboards e ferramentas internas, melhorando a visualização e a interatividade.",
          "Gerenciei a autenticação e o controle de acesso no Firebase, garantindo uma gestão de usuários segura e escalável.",
          "Escrevi testes unitários e de integração com Jest, aumentando a confiabilidade dos deploys.",
          "Contribuí para o Design System, implementando componentes de UI acessíveis, consistentes e de fácil manutenção.",
        ],
        technologies: ["Vue.js", "Vuetify", "Firebase", "Jest", "Testes Front-End", "Componentes de UI", "Manutenibilidade", "Escalabilidade"],
      },
      {
        bullets: [
          "Desenvolvi componentes Vue.js reutilizáveis, aplicando boas práticas de comunicação e responsividade.",
          "Implementei métodos de ciclo de vida e fluxos de dados reativos para atualizações dinâmicas da interface.",
          "Apoiei a organização e a estrutura do projeto, melhorando a manutenibilidade e o onboarding de novos desenvolvedores.",
        ],
        technologies: ["Vue.js", "Vuex", "JavaScript", "Arquitetura de Componentes", "Desenvolvimento Front-End", "Reutilização"],
      },
    ],
  },
};
