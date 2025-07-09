"use client";

import { metrics, metricsKeys } from "@/data/metrics";
import { SiteTypeChart } from "./site-type-chart";

export function SiteTypeMetrics() {
    return (
        <div>
            <p className="mb-6">
                Note: In the following box plots, the solid line is the meadian,
                and dashed line is the mean.
            </p>
            {metricsKeys.map((metric) => (
                <SiteTypeChart key={metric} metric={metric} data={metrics} />
            ))}
        </div>
    );
}
