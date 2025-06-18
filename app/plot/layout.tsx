import { PlotSelect } from "@/components/plot/plot-select";

import { PlotNavLinks } from "@/components/plot/plot-nav-links";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="dark bg-background text-foreground px-8 h-12 flex gap-4 items-center sticky top-0 z-10">
        <PlotSelect />
        <PlotNavLinks />
      </header>

      {children}
    </>
  );
}
