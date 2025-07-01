"use client";

import { Canvas } from "@react-three/fiber";

export function PlotCanvas({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{
                    position: [35, 35, 35],
                    near: 0.01,
                    far: 400,
                    zoom: 10,
                }}
                orthographic
            >
                {children}
            </Canvas>
        </div>
    );
}
