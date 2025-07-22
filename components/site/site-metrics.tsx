"use client";

import { metrics, metricsKeys, metricsMetadata } from "@/data/metrics";
import { group } from "d3";
import { SiteChart } from "./site-chart";

const metricList = Object.entries(metricsMetadata);
const metricsByCategory = group(metricList, (d) => d[1].category);

export function SiteMetrics() {
    const metricList = Object.entries(metricsMetadata);

    return (
        <div>
            <p className="mb-6">
                Note: In the following box plots, the solid line is the meadian,
                and dashed line is the mean.
            </p>
            <h1 className="text-2xl font-bold my-6">Height Metrics</h1>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("height")!
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
            <h1 className="text-2xl font-bold my-6">Openness Metrics</h1>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("cover")!
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
            <h1 className="text-2xl font-bold my-6">Complexity Metrics</h1>
            <h2 className="text-xl font-bold my-6">Complexity - Exterior</h2>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("complexity")!
                    .filter(
                        ([metricKey, metricMetadata]) =>
                            metricMetadata?.sub_category == "exterior",
                    )
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
            <h2 className="text-xl font-bold my-6">Complexity - Vertical</h2>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("complexity")!
                    .filter(
                        ([metricKey, metricMetadata]) =>
                            metricMetadata?.sub_category == "vertical",
                    )
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
            <h2 className="text-xl font-bold my-6">Complexity - Horizontal</h2>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("complexity")!
                    .filter(
                        ([metricKey, metricMetadata]) =>
                            metricMetadata?.sub_category == "horizontal",
                    )
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
            <h2 className="text-xl font-bold my-6">Complexity - 3D</h2>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("complexity")!
                    .filter(
                        ([metricKey, metricMetadata]) =>
                            metricMetadata?.sub_category == "3D",
                    )
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
            {/* <h1 className="text-2xl font-bold my-6">Exterior Metrics</h1>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("exterior")!
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
            <h1 className="text-2xl font-bold my-6">Interior Metrics</h1>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("interior")!
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div> */}
            <h1 className="text-2xl font-bold my-6">Ancillary Metrics</h1>
            <div className="gap-8 grid">
                {metricsByCategory
                    .get("ancillary")!
                    .map(([metricKey, metricMetadata]) => (
                        <SiteChart
                            key={metricKey}
                            metric={metricKey}
                            data={metrics}
                            metadata={metricMetadata}
                        />
                    ))}
            </div>
        </div>
    );
}
