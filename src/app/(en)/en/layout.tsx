import type { Metadata } from "next";
import "@/app/globals.css";
import RootShell from "@/layouts/RootShell";
import { layoutMetadata } from "@/seo/metadata";

export const metadata: Metadata = layoutMetadata("en");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
