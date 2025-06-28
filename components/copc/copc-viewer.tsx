"use client";

import {
    OrbitControls,
    GizmoHelper,
    GizmoViewport,
    Grid,
    Effects,
    useFBO,
} from "@react-three/drei";
import { CopcPointCloud } from "./copc-point-cloud";
import { Suspense } from "react";
import "./edl-pass";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function CopcViewer({ filename }: { filename: string }) {
    const { camera } = useThree();

    const depthTexture = new THREE.DepthTexture(
        window.innerWidth,
        window.innerHeight,
    );

    const depthRenderTarget = useFBO(window.innerWidth, window.innerHeight, {
        depthTexture,
        depthBuffer: true,
    });

    useFrame((state) => {
        const { gl, scene, camera } = state;

        gl.setRenderTarget(depthRenderTarget);
        gl.render(scene, camera);

        gl.setRenderTarget(null);
    });

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

            <Effects>
                {/* @ts-ignore */}
                <edlPass
                    args={[
                        {
                            depthRenderTarget,
                            camera,
                        },
                    ]}
                />
            </Effects>
        </>
    );
}
