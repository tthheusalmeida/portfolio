import type { Metadata } from "next";
import "../globals.css";
import RootShell from "@/layouts/RootShell";
import { layoutMetadata } from "@/seo/metadata";

export const metadata: Metadata = layoutMetadata("pt");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="pt">{children}</RootShell>;
}
