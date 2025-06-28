"use client";

import { useSearchParams } from "next/navigation";
import { CopcPointCloud } from "../copc/copc-point-cloud";
import {
    GizmoHelper,
    GizmoViewport,
    Grid,
    OrbitControls,
} from "@react-three/drei";

export function PlotPointCloud() {
    const searchParams = useSearchParams();
    const plotId = searchParams.get("id");

    if (!plotId) {
        return null;
    }

    const httpFilename = `${window.location.origin}/lidar-plots-copc/${plotId}.copc.laz`;

    return (
        <>
            <CopcPointCloud key={plotId} filename={httpFilename} />;
            <Grid
                cellSize={1}
                sectionSize={10}
                infiniteGrid
                fadeDistance={100}
                fadeStrength={1}
                fadeFrom={0.5}
            />
            <OrbitControls makeDefault />
            <GizmoHelper
                alignment="bottom-left" // widget alignment within scene
                margin={[80, 80]} // widget margins (X, Y)
            >
                <GizmoViewport
                    axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
                    labelColor="white"
                />
            </GizmoHelper>
        </>
    );
}
