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
  title: "Matheus Almeida",
  description: "",
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
