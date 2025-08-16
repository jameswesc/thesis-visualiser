"use client"

import * as React from "react"
import plots from "@/data/plots.json"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { groups } from "d3"

const plotsByTypeBySite = groups(
    plots,
    (d) => d.site.slice(0, 3),
    (d) => d.site
)

export function PlotSelect() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const plotId = searchParams.get("id")

    const handlePlotChange = (sitePlotId: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("id", sitePlotId)
        router.push(`/plot?${params.toString()}`)
    }

    return (
        <>
            <span>Plot</span>

            <Select
                value={plotId || undefined}
                onValueChange={handlePlotChange}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a plot" />
                </SelectTrigger>
                <SelectContent>
                    {plotsByTypeBySite.map(([siteType, plotsBySite]) => (
                        <SelectGroup key={siteType}>
                            <SelectLabel className="font-bold mt-2">
                                {siteType}
                            </SelectLabel>
                            {plotsBySite.map(([site, plots]) => (
                                <SelectGroup key={site}>
                                    <SelectLabel>{site}</SelectLabel>
                                    {plots.map((p) => (
                                        <SelectItem value={p.id} key={p.id}>
                                            {p.id}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}
