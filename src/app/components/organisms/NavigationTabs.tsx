"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { mergeClassNames } from "@/utils/classNames";

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

const tabs = [
  { id: NAVIGATION_TAB_INDEX.HOME, label: "Home" },
  { id: NAVIGATION_TAB_INDEX.PROJECTS, label: "Projects" },
  { id: NAVIGATION_TAB_INDEX.EXPERIENCECS, label: "Experiences" },
  { id: NAVIGATION_TAB_INDEX.EDUCATION, label: "Education" },
  { id: NAVIGATION_TAB_INDEX.TESTIMONIALS, label: "Testimonials" },
  { id: NAVIGATION_TAB_INDEX.CONTACT, label: "Contact" },
];

interface NavigationTabsProps {
  className?: string;
}

export default function NavigationTabs({ className }: NavigationTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("home");
  const pathname = usePathname();

  if (pathname !== "/") return null;

  const handleClick = (id: string) => {
    setActiveTab(id);
    scrollIntoSection(id);
  };

  return (
    <nav className={mergeClassNames("flex space-x-6 relative", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={(e) => {
            e.preventDefault();
            handleClick(tab.id);
          }}
          className={`relative pb-1 transition-colors ${
            activeTab === tab.id
              ? "text-[var(--color-foreground)]"
              : "text-[var(--color-foreground)]/40"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
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
