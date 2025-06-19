"use client";

import stdMetrics from "@/data/std_metrics.json";
import { SiteChart } from "./site-chart";

const metricNames = Object.keys(stdMetrics[0]).filter(
  (key) =>
    !["fid", "site", "plot_number", "site_type", "site_plot_id"].includes(key),
);

export function SiteMetrics() {
  return (
    <div>
      <p className="mb-6">
        Note: In the following box plots, the solid line is the meadian, and
        dashed line is the mean.
      </p>
      {metricNames.map((metric) => (
        <SiteChart key={metric} metric={metric} data={stdMetrics} />
      ))}
    </div>
  );
}
