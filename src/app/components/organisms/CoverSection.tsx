import CheckOutMy from "@/app/components/molecules/CheckOutMy";
import SoftSkillsCarousel from "@/app/components/molecules/SoftSkillsCarousel";
import Stack from "@/app/components/molecules/Stack";
import SectionTemplate from "@/templates/SectionTemplate";
import Image from "next/image";
import Title from "@/app/components/atoms/Title";
import DownloadButton from "../molecules/DownloadButton";
import RouterButton from "../atoms/RouterButton";
import AnimatedComponent from "../molecules/AnimatedComponent";

export default function CoverSection() {
  const cvFileName = "Matheus_Almeida_CV_Front-End_Software_Engineer.pdf";
  const cvFilePath = `/files/${cvFileName}`;

  return (
    <>
      <SectionTemplate
        className="relative flex flex-col justify-evenly sm:gap-0 gap-16"
        isTranparentBackgroud
        noPaddingInline
      >
        <div className="flex flex-col justify-center mx-4">
          <div className="flex sm:flex-row sm:justify-between flex-col items-center">
            <div className="flex flex-col items gap-6 sm:block w-full sm:w-auto pt-10 sm:pt-0">
              <div className="flex flex-col select-none items-center sm:items-start">
                <Title>Software Engineer</Title>
                <Title>Front-End</Title>
              </div>
              <AnimatedComponent
                HTMLtag="div"
                className="flex sm:hidden items-center justify-center px-4"
              >
                <Image
                  src="/cover/me.webp"
                  width={556}
                  height={500}
                  priority
                  placeholder="empty"
                  alt="matheus, focused programmer wearing a hoodie and headset, working on a laptop."
                />
              </AnimatedComponent>

              <div className="flex gap-6 pt-8 px-4 sm:px-0 sm:w-[296px] w-full">
                <RouterButton path="contact">Contact me</RouterButton>
                <DownloadButton fileName={cvFileName} filePath={cvFilePath}>
                  Download CV
                </DownloadButton>
              </div>
            </div>

            <AnimatedComponent HTMLtag="div" className="sm:inline-block hidden">
              <Image
                src="/cover/me.webp"
                width={556}
                height={500}
                priority
                placeholder="empty"
                alt="matheus, focused programmer wearing a hoodie and headset, working on a laptop."
              />
            </AnimatedComponent>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-20 sm:mt-0 items-center sm:items-baseline-last sm:pt-0 pt-6 sm:gap-0 gap-8">
            <Stack className="sm:order-1 order-2" />
            <CheckOutMy className="sm:order-2 order-1" />
          </div>
        </div>

        <SoftSkillsCarousel />
      </SectionTemplate>
    </>
  );
}
