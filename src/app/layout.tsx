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
    default: "Matheus Almeida - Software Engineer Front End",
    template: "%s | Matheus Almeida",
  },
  description:
    "Software Engineer Front-End specialized in Vue, React, Tailwind, HTML, CSS, and JavaScript. I transform ideas into modern, accessible, and high-performance digital experiences.",
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
    "Software Engineer",
    "Desenvolvedor Frontend",
    "Frontend Developer",
    "Vue",
    "React",
    "Tailwind",
    "JavaScript",
    "Next.js",
    "HTML",
    "CSS",
    "Express",
    "MongoBD",
    "Firebase",
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
      "Turning ideas into modern digital experiences using Vue, React, Tailwind, and cutting-edge frontend technologies.",
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
