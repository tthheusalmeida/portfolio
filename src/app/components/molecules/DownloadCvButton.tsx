"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { downloadCv } from "@/cv/downloadCv";
import Button from "../atoms/Button";
import { Toast } from "../organisms/Toast";

// Builds the CV from the portfolio data, in the current language, on click.
export default function DownloadCvButton() {
  const { lang, t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleClick = async () => {
    setIsGenerating(true);
    try {
      await downloadCv(lang);
    } catch (error) {
      console.error(error);
      Toast.error(t("cover.cvError"));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      isLoading={isGenerating}
      disabled={isGenerating}
      aria-busy={isGenerating}
    >
      {t("cover.cv")}
    </Button>
  );
}
