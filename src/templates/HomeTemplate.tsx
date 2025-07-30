import PageLayout from "@/layouts/PageLayout";
import CoverSection from "../app/components/organisms/CoverSection";
import ProjectsSection from "@/app/components/organisms/ProjectsSection";
import Experiences from "@/app/components/organisms/Experiences";
import EducationSection from "@/app/components/organisms/EducationSection";
import TestimonialsSection from "@/app/components/organisms/TestimonialsSection";
import ContactSection from "@/app/components/organisms/ContactSection";

export default function HomeTemplate() {
  return (
    <PageLayout>
      <CoverSection />
      <ProjectsSection />
      <Experiences />
      <EducationSection />
      <TestimonialsSection />
      <ContactSection />
    </PageLayout>
  );
}
