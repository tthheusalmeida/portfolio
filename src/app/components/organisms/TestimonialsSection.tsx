import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";
import Testimonial from "../molecules/Testimonial";
import DATA from "@/data";
import HighlightText from "../atoms/HighlightText";

export default function TestimonialsSection() {
  const testimonials = DATA.testimonials;
  return (
    <SectionTemplate className="flex flex-col items-center sm:rounded-b-2xl">
      <TitleAndSubtitleSection
        title="Testimonials"
        subtitle={
          <>
            From <HighlightText>Clients</HighlightText>,{" "}
            <HighlightText>Teammates</HighlightText>, and{" "}
            <HighlightText>Classmates</HighlightText> who have collaborated with
            me along the way
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
