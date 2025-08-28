import Header from "@/app/components/organisms/Header";
import PageTemplate from "@/templates/PageTemplate";
import BackgroundBlur from "@/app/components/molecules/BackgroundBlur";
import BackToTopButton from "@/app/components/organisms/BackToTopButton";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTemplate>
      <Header />
      {children}
      <BackgroundBlur />
      <BackToTopButton />
    </PageTemplate>
  );
}
