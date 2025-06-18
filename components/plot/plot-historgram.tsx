"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
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

    const chart = Plot.plot({
      title: "Height Density Profile",
      height: 800,
      x: {
        percent: true,
        domain: [0, 20],
      },
      marginLeft: 60,
      marks: [
        Plot.line(allProfiles, {
          x: "proportion",
          y: "zmin",
          z: "plotId",
          curve: "catmull-rom",
          strokeWidth: 1,
          stroke: "var(--color-neutral-300)",
          strokeOpacity: 0.5,
        }),

        Plot.line(
          allProfiles.filter((d) => d.plotId === plotId),
          {
            x: "proportion",
            y: "zmin",
            curve: "catmull-rom",
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
