"use client";

import { PlotData } from "@/lib/fetch-plot";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { OrbitControls, Point, Points } from "@react-three/drei";
import { Color, LinearSRGBColorSpace, SRGBColorSpace } from "three";

export function PlotRenderer({ data }: { plotId: string; data: PlotData }) {
  const buffers = useMemo(() => {
    const positionBuffer = new Float32Array(data.numPoints * 3);
    const colorBuffer = new Float32Array(data.numPoints * 3);

    const color = new Color();

    for (let i = 0; i < data.numPoints; i++) {
      const offset = i * 3;
      const x = data.positions[offset + 0] - data.center.x;
      const y = data.positions[offset + 1] - data.center.y;
      const z = data.positions[offset + 2];

      positionBuffer.set([x, z, y], offset);

      const r = data.colors[offset + 0];
      const g = data.colors[offset + 1];
      const b = data.colors[offset + 2];

      color.setRGB(r, g, b, SRGBColorSpace);
      color.toArray(colorBuffer, offset);
    }

    return {
      positionBuffer,
      colorBuffer,
    };
  }, [data]);

  return (
    <Canvas
      camera={{
        position: [0, 35, 35],
      }}
    >
      <OrbitControls />

      <Points positions={buffers.positionBuffer} colors={buffers.colorBuffer}>
        <pointsMaterial size={0.2} vertexColors />
      </Points>
    </Canvas>
  );
}
