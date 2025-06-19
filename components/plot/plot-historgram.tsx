"use client";

import { useEffect, useRef } from "react";
import { plot, line } from "@observablehq/plot";
import heightDensityProfiles from "@/data/height_density_profile_1m.json";

const allProfiles = heightDensityProfiles.flatMap((plotProfile) =>
  plotProfile.height_profile
    .map((d) => ({
      ...d,
      plotId: plotProfile.site_plot_id,
    }))
    .filter((d) => d.zmin >= 0),
);

export function PlotHistogram({ plotId }: { plotId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(allProfiles);
    // if (!profile) return;

    const chart = plot({
      title: "Height Density Profile",
      height: 800,
      x: {
        percent: true,
        domain: [0, 20],
      },
      y: {
        grid: true,
      },
      marginLeft: 60,
      marks: [
        line(allProfiles, {
          x: "proportion",
          y: "zmin",
          z: "plotId",
          curve: "step-before",
          strokeWidth: 1,
          stroke: "var(--color-neutral-300)",
          strokeOpacity: 0.5,
        }),

        line(
          allProfiles.filter((d) => d.plotId === plotId),
          {
            x: "proportion",
            y: "zmin",
            curve: "step-before",
            stroke: "var(--chart-1)",
            strokeOpacity: 1,
            strokeWidth: 3,
            // marker: true,
          },
        ),
      ],
    });

    ref.current?.append(chart);

    return () => chart.remove();
  }, [ref, allProfiles, plotId]);

  return <div ref={ref} />;
}
