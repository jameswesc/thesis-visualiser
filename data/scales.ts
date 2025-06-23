import plots from "@/data/plots.json";
import { sortedUniq } from "lodash";

// Young to old
// Most disturbed to least disturbed
export const siteTypesInOrder = [
  // Pines plantation young and old
  "PPY",
  "PPO",
  // Eucalypt plantation young and old
  "EPY",
  "EPO",
  // Native regrowrh young, mid & old
  "NRY",
  "NRM",
  "NRO",
  // Young aggregated retention
  "AGG",
  // Unlogged, young older and mature
  "ULY",
  "ULO",
  "ULM",
];

// In same order as siteTypesInOrder
export const siteTypeColors = [
  // Pine plantations young and old
  "#9E9AC8",
  "#756BB1",
  // Eucalypt plantation young and old
  "#6BAED6",
  "#3182BD",
  // Native regrowrh young, mid & old
  "#FD8D3C",
  "#E6550D",
  "#A63603",
  // Young aggregated retention
  "#F768A1",
  // Unlogged, young older and mature
  "#74C476",
  "#31A354",
  "#006D2C",
];

let plotsInOrder = [...plots];
plotsInOrder.sort((p1, p2) => {
  let p1Ndx = siteTypesInOrder.indexOf(p1.site_type);
  let p2Ndx = siteTypesInOrder.indexOf(p2.site_type);

  if (p1Ndx === -1 || p2Ndx === -1) {
    return 0;
  }

  if (p1Ndx === p2Ndx) {
    return p1.site_plot_id.localeCompare(p2.site_plot_id);
  }

  return p1Ndx - p2Ndx;
});

export const sitesInOrder = sortedUniq(plotsInOrder.map((p) => p.site));
