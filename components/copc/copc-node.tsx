"use client"

import { Hierarchy, Copc } from "copc"
import { useEffect, useRef, useState } from "react"
import { createLazPerf } from "laz-perf"
import { Color, InstancedMesh, Object3D, SRGBColorSpace } from "three"
import { interpolateViridis, scaleSequential } from "d3"
import { extend } from "@react-three/fiber"
import { Points, shaderMaterial } from "@react-three/drei"

// Create custom shader material using drei
const LidarPointMaterial = shaderMaterial(
    {
        // Uniforms (if needed)
    },
    // Vertex shader
    `
    // attribute vec3 instanceColor; // inserted by threejs
    varying vec3 vColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
        vColor = instanceColor;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        vPosition = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
    }
    `,
    // Fragment shader
    `
    varying vec3 vColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }
    `
)

// Extend Three.js with our custom material
extend({ LidarPointMaterial })

export function CopcNode({
    filename,
    copc,
    nodeId,
    node,
    nodeMap,
    renderAsSpheres,
    colorBy,
}: {
    filename: string
    copc: Copc
    nodeId: string
    node: Hierarchy.Node
    nodeMap: Hierarchy.Node.Map
    renderAsSpheres?: boolean
    colorBy: "rgb" | "height"
}) {
    const [buffers, setBuffers] = useState<{
        positions: Float32Array
        colors: Float32Array
    }>()

    const instancedMeshRef = useRef<InstancedMesh>(null!)

    const colorScale = scaleSequential(interpolateViridis).domain([
        0,
        copc.header.max[2] * 0.98,
    ])

    // The cube center
    // In the future a "shift" might be better
    const cx = (copc.info.cube[0] + copc.info.cube[3]) / 2
    const cy = (copc.info.cube[1] + copc.info.cube[4]) / 2
    const cz = (copc.info.cube[2] + copc.info.cube[5]) / 2

    useEffect(() => {
        async function loadNodeData() {
            const lazPerf = await createLazPerf({
                locateFile: (file: string) => {
                    if (file.endsWith("laz-perf.wasm")) {
                        return `/laz-perf.wasm`
                    }
                    return file
                },
            })
            const view = await Copc.loadPointDataView(filename, copc, node, {
                lazPerf: lazPerf,
            })

            const getters = ["X", "Y", "Z", "Red", "Green", "Blue"].map(
                view.getter
            )
            const getPoint = (i: number) => getters.map((get) => get(i))

            console.log(getPoint(0))

            const positions = new Float32Array(view.pointCount * 3)
            const colors = new Float32Array(view.pointCount * 3)
            const tempColor = new Color()

            for (let i = 0; i < node.pointCount; i++) {
                const [x, y, z, r, g, b] = getPoint(i)
                // Switch y and z for threejs coord system
                // Don't shift Z
                positions.set([x - cx, z, y - cy], i * 3)

                if (colorBy == "rgb") {
                    tempColor.setRGB(
                        r / 65535,
                        g / 65535,
                        b / 65535,
                        renderAsSpheres ? undefined : SRGBColorSpace
                    )
                } else if (colorBy == "height") {
                    tempColor.set(colorScale(z))
                }
                colors.set(tempColor.toArray(), i * 3)
            }

            setBuffers({ positions, colors })
        }

        loadNodeData()

        return () => {
            setBuffers(undefined)
        }
    }, [filename, node, copc, renderAsSpheres, colorBy])

    // Update instanced mesh matrices and colors
    useEffect(() => {
        if (!buffers || !instancedMeshRef.current) return

        const instancedMesh = instancedMeshRef.current
        const tempObject = new Object3D()
        const tempColor = new Color()

        for (let i = 0; i < node.pointCount; i++) {
            // Set position
            tempObject.position.set(
                buffers.positions[i * 3],
                buffers.positions[i * 3 + 1],
                buffers.positions[i * 3 + 2]
            )

            // Set scale (adjust sphere size as needed)
            tempObject.scale.set(0.15, 0.1, 0.15)

            tempObject.updateMatrix()
            instancedMesh.setMatrixAt(i, tempObject.matrix)

            // Set color
            tempColor.setRGB(
                buffers.colors[i * 3],
                buffers.colors[i * 3 + 1],
                buffers.colors[i * 3 + 2]
            )
            instancedMesh.setColorAt(i, tempColor)
        }

        instancedMesh.instanceMatrix.needsUpdate = true
        instancedMesh.instanceColor!.needsUpdate = true
    }, [buffers, node.pointCount])

    const { depth, x, y, z } = parseNodeId(nodeId)
    const childNodeCoords = getChildNodeCoords(depth, x, y, z)

    const childNodes = childNodeCoords
        .map(({ depth, x, y, z }) => {
            const id = `${depth}-${x}-${y}-${z}`
            const node = nodeMap[id]
            if (!node) return null

            return {
                nodeId: id,
                node,
            }
        })
        .filter((d) => d != null)

    // const innerCubes = Math.pow(2, depth);
    // const cubeWidth = (copc.info.cube[3] - copc.info.cube[0]) / innerCubes;

    // // Calculate cube shifts for positioning
    // const cubeXShift = (x - (innerCubes - 1) / 2) * cubeWidth;
    // const cubeYShift = (y - (innerCubes - 1) / 2) * cubeWidth;
    // const cubeZShift = (z - (innerCubes - 1) / 2) * cubeWidth;

    if (!buffers) {
        return null
    }

    return (
        <>
            {renderAsSpheres ? (
                <instancedMesh
                    ref={instancedMeshRef}
                    args={[undefined, undefined, node.pointCount]}
                >
                    <icosahedronGeometry args={[1, 1]}></icosahedronGeometry>
                    {/* @ts-ignore */}
                    <lidarPointMaterial />
                </instancedMesh>
            ) : (
                <Points
                    key={filename}
                    positions={buffers.positions}
                    colors={buffers.colors}
                >
                    <pointsMaterial size={0.3} vertexColors />
                </Points>
            )}

            {childNodes.map(({ nodeId, node }) => (
                <CopcNode
                    key={nodeId}
                    filename={filename}
                    nodeId={nodeId}
                    node={node}
                    nodeMap={nodeMap}
                    copc={copc}
                    renderAsSpheres={renderAsSpheres}
                    colorBy={colorBy}
                />
            ))}
        </>
    )
}

function parseNodeId(nodeId: string) {
    // NodeId looks like depth-x-y-z
    // e.g. 1-0-0-1
    const [depth, x, y, z] = nodeId.split("-").map(Number)

    return {
        depth,
        x,
        y,
        z,
    }
}

function getChildNodeCoords(depth: number, x: number, y: number, z: number) {
    return [
        { depth: depth + 1, x: x, y: y, z: z },
        { depth: depth + 1, x: x + 1, y: y, z: z },
        { depth: depth + 1, x: x, y: y + 1, z: z },
        { depth: depth + 1, x: x + 1, y: y + 1, z: z },
        { depth: depth + 1, x: x, y: y, z: z + 1 },
        { depth: depth + 1, x: x + 1, y: y, z: z + 1 },
        { depth: depth + 1, x: x, y: y + 1, z: z + 1 },
        { depth: depth + 1, x: x + 1, y: y + 1, z: z + 1 },
    ]
}
