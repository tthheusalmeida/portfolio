"use client";

import { useState } from "react";
import { FaCheck, FaLinkedinIn, FaRegCopy, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useData, useLanguage } from "@/contexts/LanguageContext";
import { mergeClassNames } from "@/utils/classNames";
import { Toast } from "../organisms/Toast";
import AnimatedComponent from "./AnimatedComponent";

const CARD =
  "flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.08]";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--action)]/15 text-[var(--action)]"
    >
      {children}
    </span>
  );
}

interface ContactCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

function ContactCard({
  href,
  title,
  description,
  icon,
  className,
}: ContactCardProps) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={encodeURI(href)}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={mergeClassNames(CARD, className)}
    >
      <Icon>{icon}</Icon>
      <span className="min-w-0">
        <span className="block font-semibold">{title}</span>
        <span className="block truncate text-xs sm:text-sm text-[var(--foreground)]/60">
          {description}
        </span>
      </span>
    </a>
  );
}

// Direct ways to reach out, for people who prefer not to use the form.
export default function ContactCards() {
  const { t } = useLanguage();
  const socialMedia = useData().socialMedia;
  const [copied, setCopied] = useState(false);

  const linkOf = (name: string) =>
    socialMedia.find((item) => item.name === name)?.link;

  const emailLink = linkOf("gmail");
  const email = emailLink?.replace("mailto:", "");
  const whatsapp = linkOf("whatsapp");
  const linkedin = linkOf("linkedin");

  const copyEmail = async () => {
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      Toast.success(t("contact.email.copied"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the mailto link still works.
    }
  };

  return (
    <AnimatedComponent HTMLtag="div" className="flex flex-col gap-3">
      <h3 className="text-lg sm:text-xl font-semibold">
        {t("contact.direct.title")}
      </h3>

      {emailLink && email && (
        <div className={mergeClassNames(CARD, "gap-2")}>
          <a
            href={encodeURI(emailLink)}
            className="flex min-w-0 flex-1 items-center gap-4"
          >
            <Icon>
              <MdOutlineMail size={22} />
            </Icon>
            <span className="min-w-0">
              <span className="block font-semibold">{t("contact.email")}</span>
              <span className="block truncate text-xs sm:text-sm text-[var(--foreground)]/60">
                {email}
              </span>
            </span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            aria-label={t("contact.email.copy")}
            title={t("contact.email.copy")}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[var(--action)] transition-colors duration-300 hover:bg-white/10 cursor-pointer"
          >
            {copied ? <FaCheck size={14} /> : <FaRegCopy size={14} />}
          </button>
        </div>
      )}

      {whatsapp && (
        <ContactCard
          href={whatsapp}
          title={t("contact.whatsapp")}
          description={t("contact.whatsapp.cta")}
          icon={<FaWhatsapp size={22} />}
        />
      )}

      {linkedin && (
        <ContactCard
          href={linkedin}
          title={t("contact.linkedin")}
          description={linkedin.replace(/^https?:\/\/(www\.)?/, "")}
          icon={<FaLinkedinIn size={20} />}
        />
      )}
    </AnimatedComponent>
  );
}
