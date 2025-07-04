import CheckOutMy from "@/app/components/molecules/CheckOutMy";
import SoftSkillsCarousel from "@/app/components/molecules/SoftSkillsCarousel";
import Stack from "@/app/components/molecules/Stack";
import SectionTemplate from "@/templates/SectionTemplate";
import Image from "next/image";
import Title from "@/app/components/atoms/Title";
import DownloadButton from "../molecules/DownloadButton";
import RouterButton from "../atoms/RouterButton";

export default function CoverSection() {
  const cvFileName = "Matheus_Almeida_CV_Front-End_Software_Engineer.pdf";
  const cvFilePath = `/files/${cvFileName}`;

  return (
    <>
      <SectionTemplate className="flex flex-col justify-between sm:gap-0 gap-16">
        <div className="flex flex-col sm:mt-16">
          <div className="flex sm:flex-row flex-col items-center">
            <div className="flex flex-col gap-6 sm:block w-full sm:w-auto pt-10 sm:pt-0">
              <div className="flex flex-col select-none items-center sm:items-start">
                <Title>Software Engineer</Title>
                <Title>Front-End</Title>
              </div>

              <Image
                src="/cover/me.png"
                width={556}
                height={479}
                priority={true}
                alt="matheus, with a white shirt with a black print and blue glasses."
                className="sm:hidden inline-block rounded-b-[40%]"
              />

              <div className="flex gap-6 pt-8 sm:w-[296px] w-full">
                <RouterButton path="contact">Contact me</RouterButton>
                <DownloadButton fileName={cvFileName} filePath={cvFilePath}>
                  Download CV
                </DownloadButton>
              </div>
            </div>

            <Image
              src="/cover/me.png"
              width={556}
              height={479}
              priority={true}
              alt="matheus, with a white shirt with a black print and blue glasses."
              className="sm:inline-block hidden rounded-b-[40%]"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-20 sm:mt-0 items-center sm:items-baseline-last sm:pr-20 sm:pt-0 pt-6 sm:gap-0 gap-8">
            <Stack className="sm:order-1 order-2" />
            <CheckOutMy className="sm:order-2 order-1" />
          </div>
        </div>

        <SoftSkillsCarousel />
      </SectionTemplate>
    </>
  );
}
