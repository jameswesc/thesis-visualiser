import heightDensities from "@/data/height_density_profile_1m.json";
import stdMetrics from "@/data/std_metrics.json";
import nonStdMetrics from "@/data/non_std_metrics.json";
import pulseDensityMetrics from "@/data/pulse_density.json";

// Atm metrics are local and can just be imported.
// In the future they may require fetching

// Create a map to efficiently merge metrics by site_plot_id
const metricsMap = new Map();

// Add height density data
heightDensities.forEach((item) => {
    metricsMap.set(item.site_plot_id, { ...item });
});

// Merge standard metrics
stdMetrics.forEach((item) => {
    const existing = metricsMap.get(item.site_plot_id);
    if (existing) {
        metricsMap.set(item.site_plot_id, { ...existing, ...item });
    } else {
        metricsMap.set(item.site_plot_id, { ...item });
    }
});

// Merge non-standard metrics
nonStdMetrics.forEach((item) => {
    const existing = metricsMap.get(item.site_plot_id);
    if (existing) {
        metricsMap.set(item.site_plot_id, { ...existing, ...item });
    } else {
        metricsMap.set(item.site_plot_id, { ...item });
    }
});

// Merge pulse density metrics
pulseDensityMetrics.forEach((item) => {
    const existing = metricsMap.get(item.site_plot_id);
    if (existing) {
        metricsMap.set(item.site_plot_id, { ...existing, ...item });
    } else {
        metricsMap.set(item.site_plot_id, { ...item });
    }
});

// Convert map back to array and export
export const allMetrics = Array.from(metricsMap.values());

export const nonMetricKeys = [
    "fid",
    "site",
    "plot_number",
    "site_type",
    "site_plot_id",
];

export const metricKeys = Object.keys(allMetrics[0]).filter(
    (key) => !nonMetricKeys.includes(key),
);

function isSingleNumberMetric(metric: string) {
    return typeof allMetrics[0][metric] === "number";
}

export const singleNumberMetricKeys = metricKeys.filter(isSingleNumberMetric);
