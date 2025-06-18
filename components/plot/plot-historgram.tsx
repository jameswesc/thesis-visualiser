"use client";
import { PlotData } from "@/lib/fetch-plot";
import { use, useEffect, useMemo, useRef } from "react";
import * as Plot from "@observablehq/plot";

export function PlotHistogram({
  plotId,
  data: promiseData,
}: {
  plotId: string;
  data: Promise<PlotData>;
}) {
  const data = use(promiseData);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = Plot.plot({
      x: {
        percent: true,
      },
      marginLeft: 60,
      marks: [
        Plot.rectX(
          data.z.filter((z) => z >= 1),
          Plot.binY({ x: "proportion" }),
        ),
      ],
    });

    ref.current?.append(chart);

    return () => chart.remove();
  }, [ref, data]);

  return <div ref={ref} />;
}
