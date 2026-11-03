import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import { poppinsSans } from "./fonts";
import { Lang } from "@/i18n/dictionary";
import { personJsonLd } from "@/seo/metadata";

const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", en: "en" };

// Each language has its own root layout (route groups), so the static HTML
// already ships with the right <html lang>, metadata and content.
export default function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <html lang={HTML_LANG[lang]}>
      <body className={`${poppinsSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(lang)),
          }}
        />
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
