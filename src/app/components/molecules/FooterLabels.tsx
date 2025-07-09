import AnimatedComponent from "./AnimatedComponent";

export default function FooterLabels() {
  return (
    <AnimatedComponent
      HTMLtag="div"
      className="flex flex-col gap-4 items-center"
    >
      <AnimatedComponent
        HTMLtag="span"
        className="text-xs sm:text-base font-medium select-all"
      >
        dev.almeida.matheus@gmail.com
      </AnimatedComponent>
      <AnimatedComponent
        HTMLtag="span"
        className="flex flex-col sm:flex-row gap-2 text-xs sm:text-base font-normal text-gray-200/50 select-none text-center"
      >
        <AnimatedComponent HTMLtag="div" delay={0} className="flex gap-2">
          <AnimatedComponent HTMLtag="span" delay={1}>
            Copyright © 2025
          </AnimatedComponent>
          <AnimatedComponent HTMLtag="span" delay={1}>
            -
          </AnimatedComponent>
          <AnimatedComponent HTMLtag="span" delay={1}>
            Matheus Almeida
          </AnimatedComponent>
        </AnimatedComponent>
        <AnimatedComponent
          HTMLtag="span"
          delay={1}
          className="hidden sm:inline"
        >
          -
        </AnimatedComponent>
        <AnimatedComponent HTMLtag="span" delay={1}>
          All Rights Reserved
        </AnimatedComponent>
      </AnimatedComponent>
    </AnimatedComponent>
  );
}
