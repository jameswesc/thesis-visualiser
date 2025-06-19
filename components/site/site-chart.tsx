"use client";

import { useEffect, useRef } from "react";
import { frame, dot, tickY, plot, boxY, groupZ } from "@observablehq/plot";

export function SiteChart({ metric, data }: { metric: string; data: any[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = plot({
      width: 1200,
      y: {
        grid: true,
      },
      color: {
        legend: true,
        // domain: ["AGG", "EPO"],
      },
      marks: [
        frame(),

        // Plot.barY(
        //   data,
        //   Plot.groupX(
        //     { y: "mean" },
        //     { y: metric, fx: "site_type", x: "plot_number", fill: "site_type" },
        //   ),
        // ),

        boxY(data, {
          fx: "site",
          y: metric,
          stroke: "site_type",
          fill: "site_type",
          fillOpacity: 0.4,
        }),

        tickY(
          data,
          groupZ(
            { y: "mean" },
            {
              fx: "site",
              y: metric,
              stroke: "site_type",
              strokeWidth: 2,
              strokeDasharray: "4,2",
              strokeDashoffset: 1,
            },
          ),
        ),

        dot(data, {
          fx: "site",
          y: metric,
          stroke: "site_type",
          strokeWidth: 2,
          strokeOpacity: 1,
          r: 4,
        }),
      ],
    });

    ref.current?.append(chart);

    return () => chart.remove();
  }, [ref, metric, data]);

  return (
    <div>
      <p>{metric}</p>
      <div ref={ref}></div>
    </div>
  );
}
