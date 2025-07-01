"use client";

import { useSearchParams } from "next/navigation";
import { CopcViewer } from "../copc/copc-viewer";

export function PlotViewer() {
    const searchParams = useSearchParams();
    const plotId = searchParams.get("id");

    if (!plotId) {
        return null;
    }

    const httpFilename = `${window.location.origin}/plots/lidar/${plotId}.copc.laz`;

    return <CopcViewer filename={httpFilename} />;
}
