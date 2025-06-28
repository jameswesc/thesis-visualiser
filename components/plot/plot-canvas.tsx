"use client";

import { Canvas } from "@react-three/fiber";
import { AspectRatio } from "../ui/aspect-ratio";
import { useEffect } from "react";

export function PlotCanvas({ children }: { children: React.ReactNode }) {
    return (
        <AspectRatio ratio={1} className="bg-gray-100 rounded-2xl ">
            <Canvas
                camera={{
                    position: [0, 35, 35],
                }}
                className="absolute inset-0"
            >
                {children}
            </Canvas>
        </AspectRatio>
    );
}
