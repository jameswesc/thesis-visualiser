"use client";

import { allMetrics, singleNumberMetricKeys } from "@/data/metrics";
import { sitesInOrder } from "@/data/scales";
import { SiteChart } from "./site-chart";

export function SiteMetrics() {
  return (
    <div>
      <p className="mb-6">
        Note: In the following box plots, the solid line is the meadian, and
        dashed line is the mean.
      </p>
      {singleNumberMetricKeys.map((metric) => (
        <SiteChart key={metric} metric={metric} data={allMetrics} />
      ))}
    </div>
  );
}
