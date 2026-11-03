import HomeTemplate from "@/templates/HomeTemplate";
import { pageMetadata } from "@/seo/metadata";

export const metadata = pageMetadata("pt", "/");

export default function Home() {
  return <HomeTemplate />;
}
