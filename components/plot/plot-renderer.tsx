"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { OrbitControls, Points } from "@react-three/drei";
import { Color, SRGBColorSpace } from "three";

export function PlotRenderer({ plotId }: { plotId: string }) {
  const buffers = useMemo(() => {
    const positionBuffer = new Float32Array(data.numPoints * 3);
    const colorBuffer = new Float32Array(data.numPoints * 3);

    const color = new Color();

    const {
      x: [minX, maxX],
      y: [minY, maxY],
    } = data.bounds;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    for (let i = 0; i < data.numPoints; i++) {
      const offset = i * 3;

      const x = data.x[i] - cx;
      const y = data.y[i] - cy;
      const z = data.z[i];

      positionBuffer.set([x, z, y], offset);

      const r = data.r[i];
      const g = data.g[i];
      const b = data.b[i];

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
      className="absolute inset-0"
    >
      <OrbitControls />

      <Points positions={buffers.positionBuffer} colors={buffers.colorBuffer}>
        <pointsMaterial size={0.2} vertexColors />
      </Points>
    </Canvas>
  );
}
