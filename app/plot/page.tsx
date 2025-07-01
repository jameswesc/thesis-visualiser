import { PlotSelect } from "@/components/plot/plot-select";
import { PlotNavLinks } from "@/components/plot/plot-nav-links";
import { PlotCanvas } from "@/components/plot/plot-canvas";
import { PlotViewer } from "@/components/plot/plot-viewer";
import { Suspense } from "react";

export default function Layout() {
    return (
        <>
            <div className="bg-background text-foreground px-8 h-12 flex gap-4 items-center border-b">
                <Suspense>
                    <PlotSelect />
                    <PlotNavLinks />
                </Suspense>
            </div>
            <div className="flex-1 relative bg-neutral-100">
                <PlotCanvas>
                    <PlotViewer />
                </PlotCanvas>
            </div>
        </>
    );
}
