import { StackInterface, stack } from "./stack";
import { SocialMediaInterface, socialMedia } from "./social-media";
import { ProjectInterface, projects } from "./project";
import { ExperienceInterface, experiences } from "./experience";
import { EducationInterface, educations } from "./education";
import { CertificationInterface, certifications } from "./certification";
import { TestimonialInterface, testimonials } from "./testimonial";
import * as pt from "./pt";
import { Lang } from "@/i18n/dictionary";

interface DataProps {
  stack: Array<StackInterface>;
  socialMedia: Array<SocialMediaInterface>;
  softSkills: Array<string>;
  projects: Array<ProjectInterface>;
  experiences: Array<ExperienceInterface>;
  educations: Array<EducationInterface>;
  certifications: Array<CertificationInterface>;
  testimonials: Array<TestimonialInterface>;
}

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

const DATA: DataProps = {
  stack,
  socialMedia,
  softSkills,
  projects,
  experiences,
  educations,
  certifications,
  testimonials,
};

export default DATA;

const DATA_PT: DataProps = {
  ...DATA,
  softSkills: pt.softSkills,
  socialMedia: socialMedia.map((item) =>
    item.name === "whatsapp" ? { ...item, link: pt.whatsappLink } : item,
  ),
  projects: projects.map((item, i) => ({ ...item, ...pt.projects[i] })),
  experiences: experiences.map((item, i) => ({
    ...item,
    ...pt.experiences[i],
    roles: item.roles.map((role, j) => ({
      ...role,
      ...pt.experiences[i].roles[j],
    })),
  })),
  educations: educations.map((item, i) => ({
    ...item,
    ...pt.educations[i],
    university: { ...item.university, ...pt.educations[i].university },
    experiences: item.experiences.map((exp, j) => ({
      ...exp,
      ...pt.educations[i].experiences[j],
    })),
  })),
  certifications: certifications.map((item, i) => ({
    ...item,
    ...pt.certifications[i],
  })),
  testimonials: testimonials.map((item, i) => ({
    ...item,
    ...pt.testimonials[i],
  })),
};

export const DATA_BY_LANG: Record<Lang, DataProps> = { en: DATA, pt: DATA_PT };
