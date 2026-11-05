"use client";

import { usePathname } from "next/navigation";
import { stripLocale } from "@/i18n/routes";
import { mergeClassNames } from "@/utils/classNames";
import { useTabs } from "@/contexts/TabsContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DictionaryKey } from "@/i18n/dictionary";
import { MdFiberNew } from "react-icons/md";

export const NAVIGATION_TAB_INDEX: Record<string, string> = {
  HOME: "home",
  PROJECTS: "projects",
  EXPERIENCES: "experiences",
  EDUCATION: "education",
  CERTIFICATION: "certification",
  TESTIMONIALS: "testimonials",
  CONTACT: "contact",
  BLOG: "blog",
};

export const scrollIntoSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const tabsList = [
  { id: NAVIGATION_TAB_INDEX.HOME },
  { id: NAVIGATION_TAB_INDEX.PROJECTS },
  { id: NAVIGATION_TAB_INDEX.EXPERIENCES },
  { id: NAVIGATION_TAB_INDEX.EDUCATION },
  { id: NAVIGATION_TAB_INDEX.CERTIFICATION },
  { id: NAVIGATION_TAB_INDEX.TESTIMONIALS },
  { id: NAVIGATION_TAB_INDEX.CONTACT },
  {
    id: NAVIGATION_TAB_INDEX.BLOG,
    href: "https://tthheusalmeida.github.io/",
    endDate: new Date(2026, 11, 31, 23, 59, 59),
  },
];

interface NavigationTabsProps {
  className?: string;
  isWithinMenu?: boolean;
}

export default function NavigationTabs({
  className,
  isWithinMenu = false,
}: NavigationTabsProps) {
  const { t } = useLanguage();
  const { activeTab, setActiveTab, setIsOnClickScrolling } = useTabs();
  const tabsRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });

  const pathname = usePathname();
  const tabs = useMemo(() => {
    return isWithinMenu ? tabsList.slice(1) : tabsList;
  }, [isWithinMenu]);

  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    const currentButton = tabsRefs.current[index];
    if (currentButton) {
      setUnderlineProps({
        left: currentButton.offsetLeft,
        width: currentButton.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  if (stripLocale(pathname) !== "/") return null;

  const handleClick = (id: string) => {
    setActiveTab(id);
    setIsOnClickScrolling(true);
    scrollIntoSection(id);

    setTimeout(() => setIsOnClickScrolling(false), 1200);
  };

  const hasTimePassed = (date?: Date) => {
    if (!date) {
      return true;
    }

    return new Date().getTime() > date.getTime();
  };

  return (
    <nav
      className={mergeClassNames(
        "flex space-x-6 relative",
        isWithinMenu ? "flex-col items-end gap-2" : "flex-row",
        className,
      )}
    >
      {tabs.map((tab, idx) => (
        <button
          key={tab.id}
          ref={(el) => {
            tabsRefs.current[idx] = el;
          }}
          onClick={(e) => {
            e.preventDefault();
            if (tab.href) {
              window.open(tab.href, "_blank");
            }

            handleClick(tab.id);
          }}
          className={mergeClassNames(
            "relative pb-1 transition-colors",
            activeTab === tab.id
              ? "text-[var(--color-foreground)]"
              : "text-[var(--color-foreground)]/40",
            isWithinMenu
              ? "text-xl mr-6 hover:text-[var(--color-foreground)]/40"
              : "",
          )}
        >
          <span>{t(`nav.${tab.id}` as DictionaryKey)}</span>

          <MdFiberNew
            size={22}
            className={mergeClassNames(
              hasTimePassed(tab.endDate) ? "hidden" : "inline",
              "absolute -top-4 -right-4",
              "text-[var(--action)]",
            )}
          />
        </button>
      ))}
      {!isWithinMenu && (
        <div
          aria-hidden
          className="absolute -bottom-0.5 h-[2px] bg-[var(--action)] rounded transition-[left,width] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
          style={{ left: underlineProps.left, width: underlineProps.width }}
        />
      )}
    </nav>
  );
}
