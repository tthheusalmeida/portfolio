"use client";

import ErrorPageTemplate from "@/templates/ErrorPageTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { rich } = useLanguage();

  return (
    <ErrorPageTemplate code={404} description={rich("notFound.description")} />
  );
}
