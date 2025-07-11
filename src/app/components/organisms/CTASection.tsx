import SectionTemplate from "@/templates/SectionTemplate";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import { FaArrowRight } from "react-icons/fa6";
import RouterButton from "@/app/components/atoms/RouterButton";
import Footer from "./Footer";

export default function CTASection() {
  return (
    <>
      <SectionTemplate
        className="flex flex-col justify-between min-h-0 h-dvh"
        isTranparentBackgroud
      >
        <div className="flex justify-center items-center h-96 my-auto">
          <div className="flex flex-col items-center justify-center select-none">
            <TitleAndSubtitleSection
              title="Did you like my work?"
              subtitle="That’s just a few projects of what I’ve done. How about we chat
            about how I can help you level up your project?"
            >
              <div className="flex gap-6 pt-8 w-[296px]">
                <RouterButton path="contact">
                  Let{`'`}s start
                  <FaArrowRight className="animate-arrow-bounce" size={18} />
                </RouterButton>
              </div>
            </TitleAndSubtitleSection>
          </div>
        </div>

        <Footer />
      </SectionTemplate>
    </>
  );
}
