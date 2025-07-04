import Logo from "../molecules/Logo";
import Menu from "../molecules/Menu";
import PageTemplate from "@/templates/PageTemplate";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-dvw z-50 bg-[var(--color-background)]/60 backdrop-blur-3xl">
      <PageTemplate>
        <div className="flex items-center justify-between h-16 select-none">
          <Logo />
          <Menu />
        </div>
      </PageTemplate>
    </div>
  );
}
