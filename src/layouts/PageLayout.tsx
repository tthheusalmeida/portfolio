import Header from "@/app/components/organisms/Header";
import PageTemplate from "@/templates/PageTemplate";
import BackgroundBlur from "@/app/components/molecules/BackgroundBlur";
import BackToTopButton from "@/app/components/organisms/BackToTopButton";
import WhatsAppButton from "@/app/components/organisms/WhatsAppButton";
import { TabsProvider } from "@/contexts/TabsContext";
import ScrollSpy from "@/app/components/organisms/ScrollSpy";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTemplate>
      <TabsProvider>
        <Header />
        {children}
        <ScrollSpy />
        <BackgroundBlur />
        <BackToTopButton />
        <WhatsAppButton />
      </TabsProvider>
    </PageTemplate>
  );
}
