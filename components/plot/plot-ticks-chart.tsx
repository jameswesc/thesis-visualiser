"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";

export function PlotTicksChart({
  plotId,
  metric,
  data,
}: {
  plotId: string;
  metric: string;
  data: any[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = Plot.plot({
      marks: [
        Plot.tickX(data, {
          x: metric,
          stroke: "var(--color-neutral-300)",
          strokeOpacity: 1,
        }),
        Plot.tickX(
          data.filter((d) => d.site_plot_id === plotId),
          {
            x: metric,
            stroke: "var(--chart-1)",
            strokeWidth: 3,
          },
        ),
      ],
    });

    ref.current?.append(chart);

    return () => chart.remove();
  }, [ref, plotId, metric, data]);

  return (
    <div className="flex">
      <div>{metric}</div>
      <div ref={ref}></div>
    </div>
  );
}
