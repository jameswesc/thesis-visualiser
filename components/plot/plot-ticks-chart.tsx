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

  const selectedPlotData = data.find((d) => d.site_plot_id === plotId);

  useEffect(() => {
    const chart = Plot.frame().plot({
      marginLeft: 16,
      clip: false,
      x: {
        nice: true,
      },
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
    <div>
      <p className="font-mono ml-4">
        <span>{metric} </span>
        <span className="text-[var(--chart-1)]">
          {selectedPlotData[metric].toFixed(1)}
        </span>
      </p>
      <div ref={ref}></div>
    </div>
  );
}
