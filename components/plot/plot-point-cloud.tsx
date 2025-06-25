"use client";

import { useSearchParams } from "next/navigation";
import { CopcPointCloud } from "../copc/copc-point-cloud";
import { OrbitControls } from "@react-three/drei";

export function PlotPointCloud() {
  const searchParams = useSearchParams();
  const plotId = searchParams.get("id");

  if (!plotId) {
    return null;
  }

  const httpFilename = `${window.location.origin}/lidar-plots-copc/${plotId}.copc.laz`;

  return (
    <>
      <OrbitControls />
      <CopcPointCloud key={plotId} filename={httpFilename} />;
    </>
  );
}
