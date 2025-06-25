"use client";

import { Edges, Float, Points } from "@react-three/drei";
import { Hierarchy, Copc } from "copc";
import { useEffect, useMemo, useState } from "react";
import { Color, SRGBColorSpace } from "three";
import { createLazPerf } from "laz-perf";

export function CopcNode({
  filename,
  copc,
  nodeId,
  node,
  nodeMap,
}: {
  filename: string;
  copc: Copc;
  nodeId: string;
  node: Hierarchy.Node;
  nodeMap: Hierarchy.Node.Map;
}) {
  const [buffers, setBuffers] = useState<{
    positions: Float32Array;
    colors: Float32Array;
  }>();

  useEffect(() => {
    async function loadNodeData() {
      const lazPerf = await createLazPerf({
        locateFile: (file: string) => {
          if (file.endsWith("laz-perf.wasm")) {
            return `/laz-perf.wasm`;
          }
          return file;
        },
      });
      const view = await Copc.loadPointDataView(filename, copc, node, {
        lazPerf: lazPerf,
      });

      const cx = (copc.info.cube[0] + copc.info.cube[3]) / 2;
      const cy = (copc.info.cube[1] + copc.info.cube[4]) / 2;

      const getters = ["X", "Y", "Z", "Red", "Green", "Blue"].map(view.getter);
      const getPoint = (i: number) => getters.map((get) => get(i));

      const positions = new Float32Array(view.pointCount * 3);
      const colors = new Float32Array(view.pointCount * 3);

      for (let i = 0; i < node.pointCount; i++) {
        const [x, y, z, r, g, b] = getPoint(i);
        // Switch y and z for threejs coord system
        positions.set([x - cx, z, y - cy], i * 3);
        colors.set([r / 65535, g / 65535, b / 65535], i * 3);
      }

      setBuffers({ positions, colors });
    }

    loadNodeData();

    return () => {
      setBuffers(undefined);
    };
  }, [filename, node, copc]);

  // const { depth, x, y, z } = parseNodeId(nodeId);

  // const xwidth = copc.info.cube[3] - copc.info.cube[0];
  // const ywidth = copc.info.cube[4] - copc.info.cube[1];
  // const zwidth = copc.info.cube[5] - copc.info.cube[2];

  if (!buffers) {
    return null;
  }

  return (
    <>
      <Points
        key={filename}
        positions={buffers.positions}
        colors={buffers.colors}
      >
        <pointsMaterial size={0.5} vertexColors />
      </Points>
      {/* <mesh scale={[xwidth, ywidth, zwidth]}>
        <boxGeometry />
        <meshBasicMaterial visible={false} />
        <Edges lineWidth={1} color="red" />
      </mesh> */}
    </>
  );
}

function parseNodeId(nodeId: string) {
  // NodeId looks like depth-x-y-z
  // e.g. 1-0-0-1
  const [depth, x, y, z] = nodeId.split("-").map(Number);

  return {
    depth,
    x,
    y,
    z,
  };
}
