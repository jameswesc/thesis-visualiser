"use client";

import { useEffect, useRef } from "react";
import { frame, dot, tickY, plot, boxY, groupZ } from "@observablehq/plot";
import { sitesInOrder, siteTypeColors, siteTypesInOrder } from "@/data/scales";

export function SiteChart({ metric, data }: { metric: string; data: any[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = plot({
      width: 1200,
      fx: {
        domain: sitesInOrder,
      },
      y: {
        grid: true,
      },
      color: {
        domain: siteTypesInOrder,
        range: siteTypeColors,
        legend: true,
      },
      marks: [
        frame(),

        boxY(data, {
          fx: "site",
          y: metric,
          stroke: "site_type",
          fill: "site_type",
          fillOpacity: 0.3,
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
