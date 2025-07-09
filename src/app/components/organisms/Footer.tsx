import PageTemplate from "@/templates/PageTemplate";
import SocialMedia from "../molecules/SocialMedia";
import FooterLabels from "../molecules/FooterLabels";
import AnimatedComponent from "../molecules/AnimatedComponent";

export default function Footer() {
  return (
    <PageTemplate className="px-0 pb-6">
      <AnimatedComponent
        HTMLtag="div"
        className="flex flex-col gap-6 items-center w-full rounded bg-[var(--color-background)]/60 p-4 backdrop-blur-lg"
      >
        <SocialMedia svgClassName="bg-transparent hover:border-transparent border-none" />

        <FooterLabels />
      </AnimatedComponent>
    </PageTemplate>
  );
}
