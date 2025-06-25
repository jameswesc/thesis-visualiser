"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import plots from "@/data/plots.json";

export function PlotNavLinks() {
  const searchParams = useSearchParams();
  const plotId = searchParams.get("id");

  const currentIndex = plots.findIndex((plot) => plot.site_plot_id === plotId);

  const nextPlot =
    currentIndex < plots.length - 1
      ? plots[currentIndex + 1].site_plot_id
      : null;
  const prevPlot =
    currentIndex > 0 ? plots[currentIndex - 1].site_plot_id : null;

  return (
    <>
      {prevPlot && <Link href={`/plot?id=${prevPlot}`}>Previous</Link>}
      {nextPlot && <Link href={`/plot?id=${nextPlot}`}>Next</Link>}
    </>
  );
}
