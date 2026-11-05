import PageLayout from "@/layouts/PageLayout";
import CoverSection from "../app/components/organisms/CoverSection";
import ProjectsSection from "@/app/components/organisms/ProjectsSection";
import ExperiencesSection from "@/app/components/organisms/ExperiencesSection";
import SoftSkillsCarousel from "@/app/components/molecules/SoftSkillsCarousel";
import EducationSection from "@/app/components/organisms/EducationSection";
import CertificationSection from "@/app/components/organisms/CertificationSection";
import TestimonialsSection from "@/app/components/organisms/TestimonialsSection";
import ContactSection from "@/app/components/organisms/ContactSection";

export default function HomeTemplate() {
  return (
    <PageLayout>
      <CoverSection />
      <ProjectsSection />
      <div className="w-full py-12 sm:py-20 bg-[var(--color-background)]">
        <SoftSkillsCarousel />
      </div>
      <ExperiencesSection />
      <EducationSection />
      <CertificationSection />
      <TestimonialsSection />
      <ContactSection />
    </PageLayout>
  );
}
