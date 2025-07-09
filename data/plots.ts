import plotsGeoJson from "./plots.geo.json";

export const plots = plotsGeoJson.features.map((f) => ({
    ...f.properties,
    geometry: f.geometry,
}));
