import HomeTemplate from "@/templates/HomeTemplate";
import { pageMetadata } from "@/seo/metadata";

export const metadata = pageMetadata("en", "/");

export default function Home() {
  return <HomeTemplate />;
}
