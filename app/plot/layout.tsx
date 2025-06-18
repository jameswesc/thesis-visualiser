import { PlotSelect } from "@/components/plot/plot-select";

import { PlotNavLinks } from "@/components/plot/plot-nav-links";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="dark bg-background text-foreground px-8 py-2 flex gap-4 items-center">
        <PlotSelect />
        <PlotNavLinks />
      </header>
      {children}
    </>
  );
}
