import { PlotSelect } from "@/components/plot/plot-select";
import { PlotNavLinks } from "@/components/plot/plot-nav-links";
import { PlotCanvas } from "@/components/plot/plot-canvas";
import { PlotPointCloud } from "@/components/plot/plot-point-cloud";
import { Suspense } from "react";

export default function Layout() {
  return (
    <>
      <header className="bg-background text-foreground px-8 h-12 flex gap-4 items-center border-b">
        <Suspense>
          <PlotSelect />
          <PlotNavLinks />
        </Suspense>
      </header>
      <div className="px-8 py-4 grid grid-cols-1 gap-4">
        <PlotCanvas>
          <Suspense>
            <PlotPointCloud />
          </Suspense>
        </PlotCanvas>
      </div>
    </>
  );
}
