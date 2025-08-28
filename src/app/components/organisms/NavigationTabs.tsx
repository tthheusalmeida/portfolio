"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { mergeClassNames } from "@/utils/classNames";
import { useTabs } from "@/contexts/TabsContext";
import { useEffect } from "react";

export const NAVIGATION_TAB_INDEX: Record<string, string> = {
  HOME: "home",
  PROJECTS: "projects",
  EXPERIENCECS: "experiences",
  EDUCATION: "education",
  TESTIMONIALS: "testimonials",
  CONTACT: "contact",
};

export const scrollIntoSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const tabsList = [
  { id: NAVIGATION_TAB_INDEX.HOME, label: "Home" },
  { id: NAVIGATION_TAB_INDEX.PROJECTS, label: "Projects" },
  { id: NAVIGATION_TAB_INDEX.EXPERIENCECS, label: "Experiences" },
  { id: NAVIGATION_TAB_INDEX.EDUCATION, label: "Education" },
  { id: NAVIGATION_TAB_INDEX.TESTIMONIALS, label: "Testimonials" },
  { id: NAVIGATION_TAB_INDEX.CONTACT, label: "Contact" },
];

interface NavigationTabsProps {
  className?: string;
  isWithinMenu?: boolean;
}

export default function NavigationTabs({
  className,
  isWithinMenu = false,
}: NavigationTabsProps) {
  const { activeTab, setActiveTab } = useTabs();
  const pathname = usePathname();

  if (pathname !== "/") return null;

  const tabs = isWithinMenu ? tabsList.slice(1) : tabsList;

  const handleClick = (id: string) => {
    setActiveTab(id);
    scrollIntoSection(id);
  };

  return (
    <nav
      className={mergeClassNames(
        "flex space-x-6 relative",
        isWithinMenu ? "flex-col items-end gap-2" : "flex-row",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={(e) => {
            e.preventDefault();
            handleClick(tab.id);
          }}
          className={mergeClassNames(
            "relative pb-1 transition-colors",
            activeTab === tab.id
              ? "text-[var(--color-foreground)]"
              : "text-[var(--color-foreground)]/40",
            isWithinMenu
              ? "text-xl text-[var(--color-foreground)] hover:text-[var(--color-foreground)]/40 mr-6"
              : ""
          )}
        >
          {tab.label}
          {activeTab === tab.id && !isWithinMenu && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[var(--action)] rounded"
            />
          )}
        </button>
      ))}
    </nav>
  );
}
