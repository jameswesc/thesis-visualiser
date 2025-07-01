"use client";

import {
    OrbitControls,
    GizmoHelper,
    GizmoViewport,
    Grid,
} from "@react-three/drei";
import { CopcPointCloud } from "./copc-point-cloud";
import { Suspense } from "react";

export function CopcViewer({ filename }: { filename: string }) {
    return (
        <>
            <Suspense>
                <CopcPointCloud key={filename} filename={filename} />
            </Suspense>
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
