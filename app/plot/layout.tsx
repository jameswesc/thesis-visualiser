import { PlotSelect } from "@/components/plot/plot-select";
import { PlotNavLinks } from "@/components/plot/plot-nav-links";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-background text-foreground px-8 h-12 flex gap-4 items-center border-b sticky z-10 top-0">
        <PlotSelect />
        <PlotNavLinks />
      </header>

      {children}
    </>
  );
}
