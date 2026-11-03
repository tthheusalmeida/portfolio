"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Lang } from "@/i18n/dictionary";

// Firebase Analytics is loaded on demand, after the page is idle, so it
// stays out of the main bundle.
function AnalyticsInit() {
  useEffect(() => {
    const load = () =>
      import("@/services/firebase").then(({ initAnalytics }) =>
        initAnalytics()
      );

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(load, 2000);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}

export default function Providers({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider lang={lang}>
      {/* Respects the user's "reduce motion" system setting. */}
      <MotionConfig reducedMotion="user">
        {children}
        <AnalyticsInit />
      </MotionConfig>
    </LanguageProvider>
  );
}
