"use client";

import { Canvas } from "@react-three/fiber";
import { AspectRatio } from "../ui/aspect-ratio";
import { useEffect } from "react";

export function PlotCanvas({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{
                    position: [0, 35, 35],
                }}
                orthographic
            >
                {children}
            </Canvas>
        </div>
    );
}
