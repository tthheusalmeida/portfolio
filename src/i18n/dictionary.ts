export type Lang = "pt" | "en";

export const DEFAULT_LANG: Lang = "pt";

// "**text**" is rendered as highlighted text and "\n" as a line break.
const en = {
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.experiences": "Experiences",
  "nav.education": "Education",
  "nav.certification": "Certifications",
  "nav.testimonials": "Testimonials",
  "nav.contact": "Contact",
  "nav.blog": "Blog",

  "cover.tagline":
    "I build, ship, run and monitor software, with a design and business mindset.",
  "cover.contact": "Contact me",
  "cover.cv": "Download CV",
  "cover.stack": "Current stack",
  "cover.alt":
    "Matheus, a focused programmer wearing a hoodie and headset, working on a laptop.",

  "a11y.menu": "Open menu",
  "a11y.close": "Close",
  "a11y.backToTop": "Back to top",
  "a11y.whatsapp": "Chat on WhatsApp",
  "a11y.language": "Language",

  "projects.title": "Projects",
  "projects.subtitle": "A reflection of my **Growth** and **Passion**",
  "projects.seeAll": "See all projects",
  "projects.pageSubtitle":
    "A collection of **freelance**, **personal**, and **pro bono** projects that shaped my journey",
  "projects.empty": "Oops! No projects match your filter. Maybe in the future :)",
  "projects.filter.categories": "Categories",
  "projects.filter.technologies": "Technologies",
  "projects.filter.all": "All",
  "projects.category.personal": "Personal",
  "projects.category.freelancer": "Freelancer",
  "projects.category.probono": "Pro bono",
  "projects.category.owner": "Owner",

  "experiences.title": "Experiences",
  "experiences.subtitle":
    "A summary of the **Roles**, **Responsibilities** that have shaped my professional path so far",
  "experiences.type.full-time": "full-time",
  "experiences.type.part-time": "part-time",
  "experiences.type.freelancer": "freelancer",
  "experiences.type.owner": "owner",
  "experiences.type.intern": "intern",
  "experiences.type.volunteer": "volunteer",
  "experiences.type.self-employed": "self-employed",

  "education.title": "Education",
  "education.level.undergraduate": "Undergraduate",
  "education.level.postgraduate": "Postgraduate",
  "education.inProgress": "In progress",
  "education.activities": "Academic activities",
  "education.subtitle":
    "Where **theory**, **research**, and **teaching** shaped the foundations of how I think and build",

  "certifications.stamp": "CERTIFIED",
  "certifications.title": "Certifications",
  "certifications.subtitle":
    "Milestones that validate my dedication to **learning**, **growth**, and **professional excellence**",

  "testimonials.title": "Testimonials",
  "testimonials.subtitle":
    "From **Clients**, **Teammates**, and **Classmates** who have collaborated with me along the way",
  "testimonials.link": "Check it out here",
  "testimonials.readMore": "Read more",
  "testimonials.readLess": "Read less",

  "contact.title": "Do you like my work?",
  "contact.subtitle":
    "Have a **project in mind**, a **question**, or just want to **say hello**?\nFeel free to reach out, I'm always open to connect!",

  "form.name": "Name",
  "form.name.placeholder": "Your name",
  "form.email": "E-mail",
  "form.email.placeholder": "Your e-mail",
  "form.message": "Message",
  "form.message.placeholder": "Your message",
  "form.send": "Send",
  "form.error.name": "Name must be at least 3 characters.",
  "form.error.email": "Please enter a valid email.",
  "form.error.messageShort": "Message must be at least 4 characters. (Hey!)",
  "form.error.messageLong": "Message must have a maximum of 300 characters. ",
  "form.success": "Got it! We’ll get back to you soon.",
  "form.fail": "Uh-oh! That didn’t work. Try again?",
  "form.unexpected": "Unexpected error. Please try again.",

  "footer.rights": "All Rights Reserved",

  "notFound.description": "This page could **not be found.**",
  "notFound.back": "Back to Home",

  "date.present": "Present",
  "date.year": "year",
  "date.years": "years",
  "date.month": "month",
  "date.months": "months",
};

export type DictionaryKey = keyof typeof en;

const pt: Record<DictionaryKey, string> = {
  "nav.home": "Início",
  "nav.projects": "Projetos",
  "nav.experiences": "Experiências",
  "nav.education": "Formação",
  "nav.certification": "Certificações",
  "nav.testimonials": "Depoimentos",
  "nav.contact": "Contato",
  "nav.blog": "Blog",

  "cover.tagline":
    "Construo, entrego, opero e monitoro software, com visão de design e negócio.",
  "cover.contact": "Fale comigo",
  "cover.cv": "Baixar CV",
  "cover.stack": "Stack atual",
  "cover.alt":
    "Matheus, programador concentrado, de moletom e headset, trabalhando em um notebook.",

  "a11y.menu": "Abrir menu",
  "a11y.close": "Fechar",
  "a11y.backToTop": "Voltar ao topo",
  "a11y.whatsapp": "Conversar no WhatsApp",
  "a11y.language": "Idioma",

  "projects.title": "Projetos",
  "projects.subtitle": "Um reflexo do meu **Crescimento** e da minha **Paixão**",
  "projects.seeAll": "Ver todos os projetos",
  "projects.pageSubtitle":
    "Uma coleção de projetos **freelance**, **pessoais** e **voluntários** que moldaram minha jornada",
  "projects.empty":
    "Ops! Nenhum projeto corresponde ao filtro. Quem sabe no futuro :)",
  "projects.filter.categories": "Categorias",
  "projects.filter.technologies": "Tecnologias",
  "projects.filter.all": "Todos",
  "projects.category.personal": "Pessoal",
  "projects.category.freelancer": "Freelancer",
  "projects.category.probono": "Voluntário",
  "projects.category.owner": "Sócio",

  "experiences.title": "Experiências",
  "experiences.subtitle":
    "Um resumo das **Funções** e **Responsabilidades** que moldaram minha trajetória profissional até aqui",
  "experiences.type.full-time": "tempo integral",
  "experiences.type.part-time": "meio período",
  "experiences.type.freelancer": "freelancer",
  "experiences.type.owner": "sócio",
  "experiences.type.intern": "estágio",
  "experiences.type.volunteer": "voluntário",
  "experiences.type.self-employed": "autônomo",

  "education.title": "Formação",
  "education.level.undergraduate": "Graduação",
  "education.level.postgraduate": "Pós-graduação",
  "education.inProgress": "Em andamento",
  "education.activities": "Atividades acadêmicas",
  "education.subtitle":
    "Onde **teoria**, **pesquisa** e **ensino** moldaram as bases de como penso e construo",

  "certifications.stamp": "CERTIFICADO",
  "certifications.title": "Certificações",
  "certifications.subtitle":
    "Marcos que validam minha dedicação ao **aprendizado**, ao **crescimento** e à **excelência profissional**",

  "testimonials.title": "Depoimentos",
  "testimonials.subtitle":
    "De **Clientes**, **Colegas de equipe** e **Colegas de faculdade** que colaboraram comigo ao longo do caminho",
  "testimonials.link": "Veja aqui",
  "testimonials.readMore": "Ler mais",
  "testimonials.readLess": "Ler menos",

  "contact.title": "Gostou do meu trabalho?",
  "contact.subtitle":
    "Tem um **projeto em mente**, uma **dúvida** ou só quer **dizer olá**?\nFique à vontade para entrar em contato, estou sempre aberto a conversar!",

  "form.name": "Nome",
  "form.name.placeholder": "Seu nome",
  "form.email": "E-mail",
  "form.email.placeholder": "Seu e-mail",
  "form.message": "Mensagem",
  "form.message.placeholder": "Sua mensagem",
  "form.send": "Enviar",
  "form.error.name": "O nome deve ter pelo menos 3 caracteres.",
  "form.error.email": "Informe um e-mail válido.",
  "form.error.messageShort": "A mensagem deve ter pelo menos 4 caracteres. (Ei!)",
  "form.error.messageLong": "A mensagem deve ter no máximo 300 caracteres.",
  "form.success": "Recebido! Entraremos em contato em breve.",
  "form.fail": "Ops! Algo deu errado. Tente novamente?",
  "form.unexpected": "Erro inesperado. Tente novamente.",

  "footer.rights": "Todos os direitos reservados",

  "notFound.description": "Esta página **não foi encontrada.**",
  "notFound.back": "Voltar ao início",

  "date.present": "Atual",
  "date.year": "ano",
  "date.years": "anos",
  "date.month": "mês",
  "date.months": "meses",
};

export const dictionary: Record<Lang, Record<DictionaryKey, string>> = {
  en,
  pt,
};
