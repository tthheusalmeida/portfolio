import { mergeClassNames } from "@/utils/classNames";
import SVGGlow from "./SVGGlow";
import VIEW from "@/data/view";

interface SocialMediaProps {
  svgClassName?: string;
  className?: string;
}

export default function SocialMedia({
  svgClassName,
  className,
}: SocialMediaProps) {
  const itens = VIEW.socialMedia;

  return (
    <div className={mergeClassNames("flex gap-4", className)}>
      {itens.map(({ name, link, color }, index) => (
        <a key={index} target="_blank" href={link}>
          <SVGGlow
            label={name}
            src={`/cover/${name}.svg`}
            color={color}
            className={svgClassName}
          />
        </a>
      ))}
    </div>
  );
}
