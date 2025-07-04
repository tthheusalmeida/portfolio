import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";

import Testimonial from "../molecules/Testimonial";
import VIEW from "@/data/view";

export default function TestimonialsSection() {
  const testimonials = VIEW.testimonials;
  return (
    <SectionTemplate className="flex flex-col items-center">
      <TitleAndSubtitleSection
        title="Testimonials"
        subtitle={
          <>
            Honest testimonials from <span className="font-bold">Clients</span>,{" "}
            <span className="font-bold">Teammates</span>, and{" "}
            <span className="font-bold">Classmates</span> who have collaborated
            with me along the way
          </>
        }
      >
        <div className="mt-11 flex flex-wrap justify-center gap-12 sm:gap-6">
          {testimonials.map(({ name, src, role, descriptions }, index) => (
            <Testimonial
              key={index}
              label={name}
              src={src}
              role={role}
              description={descriptions}
            />
          ))}
        </div>
      </TitleAndSubtitleSection>
    </SectionTemplate>
  );
}
