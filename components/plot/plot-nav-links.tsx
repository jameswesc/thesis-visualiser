"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import plots from "@/data/plots.json";

export function PlotNavLinks() {
  const { plot_id } = useParams<{ plot_id: string }>();

  const currentIndex = plots.findIndex((plot) => plot.site_plot_id === plot_id);

  const nextPlot =
    currentIndex < plots.length - 1
      ? plots[currentIndex + 1].site_plot_id
      : null;
  const prevPlot =
    currentIndex > 0 ? plots[currentIndex - 1].site_plot_id : null;

  return (
    <>
      {prevPlot && <Link href={prevPlot}>Previous</Link>}
      {nextPlot && <Link href={nextPlot}>Next</Link>}
    </>
  );
}
