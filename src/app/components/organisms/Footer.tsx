"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTabs } from "@/contexts/TabsContext";
import { DictionaryKey } from "@/i18n/dictionary";
import { stripLocale } from "@/i18n/routes";
import PageTemplate from "@/templates/PageTemplate";
import { mergeClassNames } from "@/utils/classNames";
import AnimatedComponent from "../molecules/AnimatedComponent";
import FooterLabels from "../molecules/FooterLabels";
import Logo from "../molecules/Logo";
import SocialMedia from "../molecules/SocialMedia";
import { NAVIGATION_TAB_INDEX, scrollIntoSection } from "./NavigationTabs";

interface FooterProps {
  className?: string;
}

const SECTIONS = [
  NAVIGATION_TAB_INDEX.HOME,
  NAVIGATION_TAB_INDEX.PROJECTS,
  NAVIGATION_TAB_INDEX.EXPERIENCES,
  NAVIGATION_TAB_INDEX.EDUCATION,
  NAVIGATION_TAB_INDEX.CERTIFICATION,
  NAVIGATION_TAB_INDEX.TESTIMONIALS,
  NAVIGATION_TAB_INDEX.CONTACT,
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50">
      {children}
    </h2>
  );
}

export default function Footer({ className }: FooterProps) {
  const { t, path } = useLanguage();
  const pathname = usePathname();
  const { setActiveTab, setIsOnClickScrolling } = useTabs();
  const isHome = stripLocale(pathname) === "/";

  // On the home page the links scroll smoothly like the header tabs; on other
  // pages they navigate to the matching section of the home page.
  const handleClick = (event: React.MouseEvent, id: string) => {
    if (!isHome) return;

    event.preventDefault();
    setActiveTab(id);
    setIsOnClickScrolling(true);
    scrollIntoSection(id);
    setTimeout(() => setIsOnClickScrolling(false), 1200);
  };

  return (
    <PageTemplate className={mergeClassNames(className, "px-0 pb-6")}>
      <footer className="w-full">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <AnimatedComponent
            HTMLtag="div"
            className="flex flex-col items-start gap-3"
          >
            <Logo className="text-4xl" />
            <p className="text-lg font-semibold">Matheus Almeida</p>
            <p className="max-w-xs text-sm text-[var(--foreground)]/60">
              {t("cover.tagline")}
            </p>
          </AnimatedComponent>

          <AnimatedComponent
            HTMLtag="nav"
            delay={0.1}
            aria-label={t("footer.sections")}
          >
            <ColumnTitle>{t("footer.sections")}</ColumnTitle>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <Link
                    href={`${path("/")}#${id}`}
                    onClick={(event) => handleClick(event, id)}
                    className="text-[var(--foreground)]/60 transition-colors hover:text-[var(--action)]"
                  >
                    {t(`nav.${id}` as DictionaryKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedComponent>

          <AnimatedComponent HTMLtag="div" delay={0.2}>
            <ColumnTitle>{t("footer.social")}</ColumnTitle>
            <SocialMedia
              className="flex-wrap"
              svgClassName="bg-transparent border-none drop-shadow-none"
            />
          </AnimatedComponent>
        </div>

        <div className="mt-10 flex justify-center">
          <FooterLabels />
        </div>
      </footer>
    </PageTemplate>
  );
}
