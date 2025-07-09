import sitesGeoJson from "./sites.geo.json";

export const sites = sitesGeoJson.features.map((f) => ({
    ...f.properties,
    geometry: f.geometry,
}));
