"use client";

import { mergeClassNames } from "@/utils/classNames";
import SVGGlow from "./SVGGlow";
import { useLanguage, useData } from "@/contexts/LanguageContext";
import AnimatedComponent from "./AnimatedComponent";

interface StackProps {
  className?: string;
}

export default function Stack({ className }: StackProps) {
  const { t } = useLanguage();
  const items = useData().stack;

  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames(
        "flex flex-col gap-4 items-center sm:items-start ",
        className
      )}
    >
      <span className="text-base">{t("cover.stack")}</span>

      <AnimatedComponent HTMLtag="div" className="flex gap-4">
        {items.map(({ name, color }, index) => (
          <SVGGlow
            key={index}
            delay={index}
            label={name}
            src={`/cover/${name}.svg`}
            color={color}
            enableGrayScale
          />
        ))}
      </AnimatedComponent>
    </AnimatedComponent>
  );
}
