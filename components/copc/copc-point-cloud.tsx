"use client"

import { Copc, Hierarchy } from "copc"
import { useEffect, useState } from "react"
import { CopcNode } from "./copc-node"
import { Pane } from "tweakpane"

export function CopcPointCloud({ filename }: { filename: string }) {
    const [copcInfo, setCopcInfo] = useState<{
        copc: Copc
        nodeMap: Hierarchy.Node.Map
    }>()

    const [renderingMode, setRenderingMode] = useState<"points" | "spheres">(
        "points"
    )

    const [colorBy, setColorBy] = useState<"rgb" | "height">("rgb")

    useEffect(() => {
        const pane = new Pane()

        const PARAMS = { renderingMode: "points", colorBy: "rgb" }

        let b = pane.addBinding(PARAMS, "renderingMode", {
            options: {
                points: "points",
                spheres: "spheres",
            },
        })

        b.on("change", (ev) => {
            if (ev.value == "points" || ev.value == "spheres") {
                setRenderingMode(ev.value)
            }
        })

        b = pane.addBinding(PARAMS, "colorBy", {
            options: {
                rgb: "rgb",
                height: "height",
            },
        })

        b.on("change", (ev) => {
            if (ev.value == "rgb" || ev.value == "height") {
                setColorBy(ev.value)
            }
        })

        return () => {
            pane.dispose()
        }
    }, [setRenderingMode, setColorBy])

    useEffect(() => {
        async function loadCopcInfo() {
            const copc = await Copc.create(filename)

            const { nodes } = await Copc.loadHierarchyPage(
                filename,
                copc.info.rootHierarchyPage
            )

            setCopcInfo({
                copc,
                nodeMap: nodes,
            })
        }

        loadCopcInfo()

        return () => {
            setCopcInfo(undefined)
        }
    }, [filename])

    if (!copcInfo) {
        return null
    }

    const { copc, nodeMap } = copcInfo

    const rootNode = nodeMap["0-0-0-0"]!

    return (
        <CopcNode
            key={renderingMode}
            filename={filename}
            nodeId="0-0-0-0"
            node={rootNode}
            nodeMap={nodeMap}
            copc={copc}
            renderAsSpheres={renderingMode == "spheres"}
            colorBy={colorBy}
        />
    )
}
