import Header from "@/app/components/organisms/Header";
import PageTemplate from "@/templates/PageTemplate";
import BackgroundBlur from "@/app/components/molecules/BackgroundBlur";
import BackToTopButton from "@/app/components/organisms/BackToTopButton";
import { TabsProvider } from "@/contexts/TabsContext";

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
        <BackgroundBlur />
        <BackToTopButton />
      </TabsProvider>
    </PageTemplate>
  );
}
