"use client";

import stdMetrics from "@/data/std_metrics.json";
import { PlotTicksChart } from "./plot-ticks-chart";
import { useEffect } from "react";

const metricNames = Object.keys(stdMetrics[0]).filter(
  (key) =>
    !["fid", "site", "plot_number", "site_type", "site_plot_id"].includes(key),
);

export function PlotStandardMetrics({ plotId }: { plotId: string }) {
  useEffect(() => {
    console.log(metricNames);
  });

  return (
    <div>
      {metricNames.map((metric) => (
        <PlotTicksChart
          key={metric}
          metric={metric}
          data={stdMetrics}
          plotId={plotId}
        />
      ))}
    </div>
  );
}
