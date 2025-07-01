import { Copc, Getter, Hierarchy } from "copc";

type Bounds = {
  x: [number, number];
  y: [number, number];
  z: [number, number];
};

export type PlotData = {
  numPoints: number;
  id: string;
  x: number[];
  y: number[];
  z: number[];
  r: number[];
  g: number[];
  b: number[];
  bounds: Bounds;
};

export async function fetchCopcInfo(filename: string): Promise<Copc> {
  return Copc.create(filename);
}

export async function fetchCopcHierarchy(
  filename: string,
  hierarchyPage: Hierarchy.Page,
): Promise<Hierarchy.Subtree> {
  return Copc.loadHierarchyPage(filename, hierarchyPage);
}

export async function fetchCopcView(
  filename: string,
  copc: Copc,
  node: Hierarchy.Node,
) {
  return Copc.loadPointDataView(filename, copc, node);
}

export async function fetchPlotCopc(plotId: string): Promise<PlotData> {
  // Fetch copc header info
  const httpFilename = `${window.location.origin}/lidar-plots-copc/${plotId}.copc.laz`;
  const copc = await Copc.create(httpFilename);

  // Fetch root hierarchy
  // Note: none of our copc's have pages. Not really sure what they are
  const { nodes, pages } = await Copc.loadHierarchyPage(
    httpFilename,
    copc.info.rootHierarchyPage,
  );

  const bounds: Bounds = {
    x: [copc.info.cube[0], copc.info.cube[3]],
    y: [copc.info.cube[1], copc.info.cube[4]],
    z: [copc.info.cube[2], copc.info.cube[5]],
  };

  const plotData: PlotData = {
    numPoints: copc.header.pointCount,
    id: plotId,
    x: [],
    y: [],
    z: [],
    r: [],
    g: [],
    b: [],
    bounds,
  };

  // Get root node. Root node always exists
  Object.values(nodes).map(async (node) => {
    if (!node) return;

    const view = await Copc.loadPointDataView(httpFilename, copc, node);
    const getX = view.getter("X");
    const getY = view.getter("Y");
    const getZ = view.getter("Z");
    const getR = view.getter("Red");
    const getG = view.getter("Green");
    const getB = view.getter("Blue");

    const numPoints = node.pointCount;
    for (let i = 0; i < numPoints; i++) {
      plotData.x.push(getX(i));
      plotData.y.push(getY(i));
      plotData.z.push(getZ(i));
      plotData.r.push(getR(i) / 65535);
      plotData.g.push(getG(i) / 65535);
      plotData.b.push(getB(i) / 65535);
    }
  });

  return plotData;
}
