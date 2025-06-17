import { asyncBufferFromUrl, parquetReadObjects } from "hyparquet";

const baseURL = `https://object-store.rc.nectar.org.au/v1/AUTH_4df2f67c2eed48a2aaeeed008a4bf0de/james-thesis`;

export type PlotData = {
  numPoints: number;
  positions: number[];
  colors: number[];
  center: { x: number; y: number };
};

export async function fetchPlotData(plotId: string): Promise<PlotData> {
  const url = `${baseURL}/lidar-plots-parquet/${plotId}.parquet`;
  const file = await asyncBufferFromUrl({ url }); // wrap url for async fetching
  const data = await parquetReadObjects({
    file,
    columns: ["xyz", "Red", "Green", "Blue", "Infrared"],
  });

  const numPoints = data.length;
  const positions: number[] = [];
  const colors: number[] = [];

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < numPoints; i++) {
    const [x, y, z] = data[i].xyz;
    positions.push(x, y, z);

    const r = Math.round(data[i].Red) / 65535;
    const g = Math.round(data[i].Green) / 65535;
    const b = Math.round(data[i].Blue) / 65535;
    colors.push(r, g, b);

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const center = {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
  };

  const plotData: PlotData = {
    numPoints,
    positions,
    colors,
    center,
  };

  return plotData;
}
