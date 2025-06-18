import { asyncBufferFromUrl, parquetReadObjects } from "hyparquet";

const baseURL = `https://object-store.rc.nectar.org.au/v1/AUTH_4df2f67c2eed48a2aaeeed008a4bf0de/james-thesis`;

type Bounds = {
  x: [number, number];
  y: [number, number];
  z: [number, number];
};

export type PlotData = {
  numPoints: number;
  x: number[];
  y: number[];
  z: number[];
  r: number[];
  g: number[];
  b: number[];
  bounds: Bounds;
};

export async function fetchPlotData(plotId: string): Promise<PlotData> {
  const url = `${baseURL}/lidar-plots-parquet/${plotId}.parquet`;
  const file = await asyncBufferFromUrl({ url }); // wrap url for async fetching
  const data = await parquetReadObjects({
    file,
    columns: ["xyz", "Red", "Green", "Blue", "Infrared"],
  });

  const numPoints = data.length;
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  for (let i = 0; i < numPoints; i++) {
    const [x, y, z] = data[i].xyz;
    xs.push(x);
    ys.push(y);
    zs.push(z);

    const r = Math.round(data[i].Red) / 65535;
    const g = Math.round(data[i].Green) / 65535;
    const b = Math.round(data[i].Blue) / 65535;
    rs.push(r);
    gs.push(g);
    bs.push(b);

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
  }

  const bounds: Bounds = {
    x: [minX, maxX],
    y: [minY, maxY],
    z: [minZ, maxZ],
  };

  const plotData: PlotData = {
    numPoints,
    x: xs,
    y: ys,
    z: zs,
    r: rs,
    g: gs,
    b: bs,
    bounds,
  };

  return plotData;
}
