"use client";

import { mergeClassNames } from "@/utils/classNames";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCompactDuration } from "@/utils/date";

interface CompanyTimeProps {
  start: string;
  end: string;
  className?: string;
}

export default function CompanyTime({
  start,
  end,
  className,
}: CompanyTimeProps) {
  const { lang } = useLanguage();

  return (
    <span className={mergeClassNames("text-xs", className)}>
      {getCompactDuration(start, end, lang)}
    </span>
  );
}
