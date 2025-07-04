import CoverSection from "../app/components/organisms/CoverSection";
import ProjectsSection from "@/app/components/organisms/ProjectsSection";
import WhereIWorkedSection from "@/app/components/organisms/WhereIWorkedSection";
import TestimonialsSection from "@/app/components/organisms/TestimonialsSection";
import CTASection from "@/app/components/organisms/CTASection";
import PageLayout from "@/layouts/PageLayout";

export default function HomeTemplate() {
  return (
    <PageLayout>
      <CoverSection />
      <ProjectsSection />
      <WhereIWorkedSection />
      <TestimonialsSection />
      <CTASection />
    </PageLayout>
  );
}
