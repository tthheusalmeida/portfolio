import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppinsSans = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppi-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Matheus Almeida - Frontend Engineer | Vue, React, Tailwind",
    template: "%s | Matheus Almeida",
  },
  description:
    "Frontend Engineer especializado em Vue, React, Tailwind, HTML, CSS e JavaScript. Transformo ideias em experiências digitais modernas, acessíveis e performáticas.",
  authors: [{ name: "Matheus Almeida", url: "https://almeida-matheus.com" }],
  creator: "Matheus Almeida",
  publisher: "Matheus Almeida",
  metadataBase: new URL("https://almeida-matheus.com"),
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Matheus Almeida",
    "Frontend",
    "Desenvolvedor Frontend",
    "Vue",
    "React",
    "Tailwind",
    "JavaScript",
    "Next.js",
    "HTML",
    "CSS",
    "Programador Frontend",
    "Engenheiro de Software",
    "Web Developer",
    "Micro-SaaS",
    "UI Developer",
    "Developer Portfolio",
  ],
  openGraph: {
    title:
      "Matheus Almeida - Software Engineer Front End | Vue, React, Tailwind",
    description:
      "Transformo ideias em experiências digitais modernas com Vue, React, Tailwind e tecnologias frontend de ponta.",
    url: "https://almeida-matheus.com",
    siteName: "Matheus Almeida",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  category: "technology",
  classification: "Software Engineer",
  applicationName: "Matheus Almeida Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsSans.variable} antialiased`}>
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
        {children}
      </body>
    </html>
  );
}
