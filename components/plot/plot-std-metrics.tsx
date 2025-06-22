"use client";

import { allMetrics, singleNumberMetricKeys } from "@/data/metrics";
import { PlotTicksChart } from "./plot-ticks-chart";

export function PlotStandardMetrics({ plotId }: { plotId: string }) {
  return (
    <div>
      {singleNumberMetricKeys.map((metric) => (
        <PlotTicksChart
          key={metric}
          metric={metric}
          data={allMetrics}
          plotId={plotId}
        />
      ))}
    </div>
  );
}
