import metricsJson from "./metrics_v3.json";
import metricsMetadataJson from "./metrics_v3_metadata.json";

export const metrics = metricsJson;

const nonMetricKeys = [
    "fid",
    "site",
    "plot_number",
    "site_type",
    "site_plot_id",
];

export const metricsKeys = Object.keys(metrics[0]).filter(
    (key) => !nonMetricKeys.includes(key),
);

export type MetricMetadata = {
    title: string;
    description: string;
    unit: string;
    category: string;
    sub_category?: string;
};

export const metricsMetadata: Record<string, MetricMetadata> =
    metricsMetadataJson;
