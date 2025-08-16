"use client"

import { useSearchParams } from "next/navigation"
import { CopcViewer } from "../copc/copc-viewer"

export function PlotViewer() {
    const searchParams = useSearchParams()
    const plotId = searchParams.get("id")

    if (!plotId) {
        return null
    }

    const httpFilename = `https://thesis-lidar-data.s3.ap-southeast-2.amazonaws.com/plots/lidar/${plotId}.copc.laz`

    return <CopcViewer filename={httpFilename} />
}
