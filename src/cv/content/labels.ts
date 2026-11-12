import type { Lang } from "@/i18n/dictionary";
import type { CvLabels } from "../types";

// Section names and field labels follow the ones recruiters and ATS parsers
// already expect ("Enterprise:", "Position:", "Technologies and tools applied").
export const CV_LABELS: Record<Lang, CvLabels> = {
  en: {
    summary: "Resume",
    mainResults: "Main Results",
    education: "Education",
    languages: "Languages",
    experience: "Work Experience",
    certifications: "Qualifications and Certifications",
    enterprise: "Enterprise",
    position: "Position",
    technologies: "Technologies and tools applied",
    periodSeparator: "to",
    contact: "Contact",
    email: "e-mail",
    portfolio: "Portfolio",
    objective: "Objective",
    country: "Brazil",
    levelUndergraduate: "B.Sc.",
    levelPostgraduate: "Postgraduate",
  },
  pt: {
    summary: "Resumo",
    mainResults: "Principais Resultados",
    education: "Formação",
    languages: "Idiomas",
    experience: "Experiência Profissional",
    certifications: "Qualificações e Certificações",
    enterprise: "Empresa",
    position: "Cargo",
    technologies: "Tecnologias e ferramentas aplicadas",
    periodSeparator: "a",
    contact: "Contato",
    email: "e-mail",
    portfolio: "Portfólio",
    objective: "Objetivo",
    country: "Brasil",
    levelUndergraduate: "Graduação",
    levelPostgraduate: "Pós-graduação",
  },
};
