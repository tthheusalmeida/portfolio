"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCopyrightYears } from "@/utils/date";
import AnimatedComponent from "./AnimatedComponent";

interface FooterLabelsProps {
  disableAnimation?: boolean;
}

export default function FooterLabels({
  disableAnimation = false,
}: FooterLabelsProps) {
  const { t } = useLanguage();
  // Starts with the build year (matches the static HTML) and then switches to
  // the real current year, so the footer never goes stale between deploys.
  const [year, setYear] = useState(Number(process.env.NEXT_PUBLIC_BUILD_YEAR));

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <AnimatedComponent
      disableAnimation={disableAnimation}
      HTMLtag="p"
      className="flex flex-col sm:flex-row gap-x-2 text-xs sm:text-base font-normal text-gray-200/50 select-none text-center"
    >
      <span>Copyright © {getCopyrightYears(year)} - Matheus Almeida</span>
      <span aria-hidden className="hidden sm:inline">
        -
      </span>
      <span>{t("footer.rights")}</span>
    </AnimatedComponent>
  );
}
