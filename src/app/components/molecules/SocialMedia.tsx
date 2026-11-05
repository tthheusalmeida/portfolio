"use client";

import { mergeClassNames } from "@/utils/classNames";
import { FaWhatsapp } from "react-icons/fa";
import SVGGlow from "./SVGGlow";
import AnimatedComponent from "./AnimatedComponent";
import { useData } from "@/contexts/LanguageContext";

interface SocialMediaProps {
  svgClassName?: string;
  className?: string;
  enableGrayScale?: boolean;
}

export default function SocialMedia({
  svgClassName,
  className,
  enableGrayScale = false,
}: SocialMediaProps) {
  const itens = useData().socialMedia;

  return (
    <div className={mergeClassNames("flex gap-4", className)}>
      {itens.map(({ name, link, color }, index) => (
        <a
          key={index}
          className="block"
          {...(link.startsWith("mailto:")
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          href={encodeURI(link)}
          aria-label={name}
        >
          {name === "whatsapp" ? (
            <AnimatedComponent
              HTMLtag="div"
              delay={index ? index * 0.2 : 0}
              className="flex items-center justify-center w-10 h-10 rounded-full
                bg-[#25d366] text-white
                transition-colors duration-300
                hover:bg-white hover:text-[#25d366]"
            >
              <FaWhatsapp size={24} aria-hidden="true" className="block" />
            </AnimatedComponent>
          ) : (
            <SVGGlow
              label={name}
              delay={index}
              src={`/cover/${name}.svg`}
              color={color}
              className={svgClassName}
              enableGrayScale={enableGrayScale}
            />
          )}
        </a>
      ))}
    </div>
  );
}
