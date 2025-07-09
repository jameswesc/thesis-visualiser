"use client";

import { metrics, metricsKeys } from "@/data/metrics";
import { SiteChart } from "./site-chart";

export function SiteMetrics() {
    return (
        <div>
            <p className="mb-6">
                Note: In the following box plots, the solid line is the meadian,
                and dashed line is the mean.
            </p>
            {metricsKeys.map((metricKey) => (
                <SiteChart key={metricKey} metric={metricKey} data={metrics} />
            ))}
        </div>
    );
}
