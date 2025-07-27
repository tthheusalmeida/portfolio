import Header from "@/app/components/organisms/Header";
import PageTemplate from "@/templates/PageTemplate";
import WhatsAppButton from "@/app/components/organisms/WhatsAppButton";
import BackgroundBlur from "@/app/components/molecules/BackgroundBlur";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTemplate>
      <Header />
      {children}
      <WhatsAppButton />
      <BackgroundBlur />
    </PageTemplate>
  );
}
