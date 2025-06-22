"use client";

import { allMetrics, singleNumberMetricKeys } from "@/data/metrics";
import { SiteTypeChart } from "./site-type-chart";

export function SiteTypeMetrics() {
  return (
    <div>
      <p className="mb-6">
        Note: In the following box plots, the solid line is the meadian, and
        dashed line is the mean.
      </p>
      {singleNumberMetricKeys.map((metric) => (
        <SiteTypeChart key={metric} metric={metric} data={allMetrics} />
      ))}
    </div>
  );
}
