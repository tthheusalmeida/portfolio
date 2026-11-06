import HomeTemplate from "@/templates/HomeTemplate";
import { pageMetadata, profilePageJsonLd } from "@/seo/metadata";
import JsonLd from "@/seo/JsonLd";

export const metadata = pageMetadata("en", "/");

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageJsonLd("en")} />
      <HomeTemplate />
    </>
  );
}
