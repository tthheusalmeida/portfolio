import { Poppins } from "next/font/google";

// Only the weights actually used by the site (font-light … font-bold).
export const poppinsSans = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppi-sans",
  subsets: ["latin"],
  display: "swap",
});
