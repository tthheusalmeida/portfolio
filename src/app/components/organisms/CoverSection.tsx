"use client";

import Stack from "@/app/components/molecules/Stack";
import SectionTemplate from "@/templates/SectionTemplate";
import Image from "next/image";
import Title from "@/app/components/atoms/Title";
import DownloadButton from "../molecules/DownloadButton";
import AnimatedComponent from "../molecules/AnimatedComponent";
import CoverLight from "../molecules/CoverLight";
import { useLanguage } from "@/contexts/LanguageContext";
import NavigationButton from "../atoms/NavigationButton";
import Subtitle from "../atoms/Subtitle";

export default function CoverSection() {
  const { t } = useLanguage();
  const cvFileName = "Matheus_Almeida_CV_Front-End_Software_Engineer.pdf";
  const cvFilePath = `/files/${cvFileName}`;

  return (
    <>
      <SectionTemplate
        id="home"
        className="relative flex flex-col justify-evenly sm:gap-0 gap-16"
        isTranparentBackgroud
        noPaddingInline
      >
        <div className="flex flex-col justify-center mx-4">
          <div className="flex sm:flex-row sm:justify-between flex-col items-center">
            <div className="flex flex-col items gap-6 sm:block w-full sm:w-auto pt-10 sm:pt-0">
              <div className="flex flex-col select-none items-center sm:items-start">
                <AnimatedComponent
                  HTMLtag="h1"
                  className="mb-2 text-sm sm:text-lg font-semibold uppercase tracking-[0.25em] text-[var(--action)]"
                >
                  Matheus Almeida
                </AnimatedComponent>
                <Title as="h2" className="font-normal">
                  Software Engineer
                </Title>
                <Title as="h2">Full Stack & DevOps</Title>
                <Subtitle className="mt-4 max-w-md text-center sm:text-left sm:text-lg text-sm">
                  {t("cover.tagline")}
                </Subtitle>
              </div>

              <AnimatedComponent
                HTMLtag="div"
                className="flex sm:hidden items-center justify-center px-4"
              >
                <div className="relative">
                  <Image
                    src="/cover/me.webp"
                    width={556}
                    height={500}
                    priority
                    fetchPriority="high"
                    placeholder="empty"
                    alt={t("cover.alt")}
                    className="relative block z-10"
                  />
                  <CoverLight imageSrc="/cover/me.webp" />
                </div>
              </AnimatedComponent>

              <div className="flex gap-6 pt-8 px-4 sm:px-0 sm:w-[296px] w-full">
                <NavigationButton>{t("cover.contact")}</NavigationButton>
                <DownloadButton fileName={cvFileName} filePath={cvFilePath}>
                  {t("cover.cv")}
                </DownloadButton>
              </div>
            </div>

            <AnimatedComponent
              HTMLtag="div"
              className="relative sm:inline-block hidden"
            >
              <Image
                src="/cover/me.webp"
                width={556}
                height={500}
                priority
                fetchPriority="high"
                placeholder="empty"
                alt={t("cover.alt")}
                className="relative block z-10"
              />
              <CoverLight imageSrc="/cover/me.webp" />
            </AnimatedComponent>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-20 sm:mt-0 items-center sm:items-baseline-last sm:pt-0 pt-6 sm:gap-0 gap-8">
            <Stack className="sm:order-1 order-2" />
          </div>
        </div>
      </SectionTemplate>
    </>
  );
}
