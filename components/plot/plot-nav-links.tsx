"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import plots from "@/data/plots.json"

export function PlotNavLinks() {
    const searchParams = useSearchParams()

    const currentPlot = searchParams.get("id")
    const currentIndex = plots.findIndex((plot) => plot.id === currentPlot)

    const nextPlot =
        currentIndex < plots.length - 1
            ? plots[currentIndex + 1].id
            : currentPlot
    const prevPlot = currentIndex > 0 ? plots[currentIndex - 1].id : currentPlot

    return (
        <>
            <Link href={`/plot?id=${prevPlot}`}>Previous</Link>
            <Link href={`/plot?id=${nextPlot}`}>Next</Link>
        </>
    )
}
