"use client";

import { Edges, Points } from "@react-three/drei";
import { Hierarchy, Copc } from "copc";
import { useEffect, useState } from "react";
import { createLazPerf } from "laz-perf";
import { Color, SRGBColorSpace } from "three";
import { interpolateViridis, scaleSequential } from "d3";

export function CopcNode({
    filename,
    copc,
    nodeId,
    node,
    nodeMap,
}: {
    filename: string;
    copc: Copc;
    nodeId: string;
    node: Hierarchy.Node;
    nodeMap: Hierarchy.Node.Map;
}) {
    const [buffers, setBuffers] = useState<{
        positions: Float32Array;
        colors: Float32Array;
    }>();

    const colorScale = scaleSequential(interpolateViridis).domain([
        0,
        copc.header.max[2] * 0.98,
    ]);

    // The cube center
    // In the future a "shift" might be better
    const cx = (copc.info.cube[0] + copc.info.cube[3]) / 2;
    const cy = (copc.info.cube[1] + copc.info.cube[4]) / 2;
    const cz = (copc.info.cube[2] + copc.info.cube[5]) / 2;

    useEffect(() => {
        async function loadNodeData() {
            const lazPerf = await createLazPerf({
                locateFile: (file: string) => {
                    if (file.endsWith("laz-perf.wasm")) {
                        return `/laz-perf.wasm`;
                    }
                    return file;
                },
            });
            const view = await Copc.loadPointDataView(filename, copc, node, {
                lazPerf: lazPerf,
            });

            const getters = ["X", "Y", "Z", "Red", "Green", "Blue"].map(
                view.getter,
            );
            const getPoint = (i: number) => getters.map((get) => get(i));

            console.log(getPoint(0));

            const positions = new Float32Array(view.pointCount * 3);
            const colors = new Float32Array(view.pointCount * 3);
            const tempColor = new Color();

            for (let i = 0; i < node.pointCount; i++) {
                const [x, y, z, r, g, b] = getPoint(i);
                // Switch y and z for threejs coord system
                // Don't shift Z
                positions.set([x - cx, z, y - cy], i * 3);
                tempColor.setRGB(
                    r / 65535,
                    g / 65535,
                    b / 65535,
                    SRGBColorSpace,
                );
                // tempColor.set(colorScale(z));
                colors.set(tempColor.toArray(), i * 3);
            }

            setBuffers({ positions, colors });
        }

        loadNodeData();

        return () => {
            setBuffers(undefined);
        };
    }, [filename, node, copc]);

    const { depth, x, y, z } = parseNodeId(nodeId);
    const childNodeCoords = getChildNodeCoords(depth, x, y, z);

    const childNodes = childNodeCoords
        .map(({ depth, x, y, z }) => {
            const id = `${depth}-${x}-${y}-${z}`;
            const node = nodeMap[id];
            if (!node) return null;

            return {
                nodeId: id,
                node,
            };
        })
        .filter((d) => d != null);

    // const innerCubes = Math.pow(2, depth);
    // const cubeWidth = (copc.info.cube[3] - copc.info.cube[0]) / innerCubes;

    // // Calculate cube shifts for positioning
    // const cubeXShift = (x - (innerCubes - 1) / 2) * cubeWidth;
    // const cubeYShift = (y - (innerCubes - 1) / 2) * cubeWidth;
    // const cubeZShift = (z - (innerCubes - 1) / 2) * cubeWidth;

    if (!buffers) {
        return null;
    }

    return (
        <>
            <Points
                key={filename}
                positions={buffers.positions}
                colors={buffers.colors}
            >
                <pointsMaterial size={3} vertexColors />
            </Points>
            {/* <mesh
                scale={cubeWidth}
                position={[cubeXShift, cz + cubeZShift, cubeYShift]}
            >
                <boxGeometry />
                <meshBasicMaterial visible={false} />
                <Edges lineWidth={1} color="red" scale={1} />
            </mesh> */}
            {childNodes.map(({ nodeId, node }) => (
                <CopcNode
                    key={nodeId}
                    filename={filename}
                    nodeId={nodeId}
                    node={node}
                    nodeMap={nodeMap}
                    copc={copc}
                />
            ))}
        </>
    );
}

function parseNodeId(nodeId: string) {
    // NodeId looks like depth-x-y-z
    // e.g. 1-0-0-1
    const [depth, x, y, z] = nodeId.split("-").map(Number);

    return {
        depth,
        x,
        y,
        z,
    };
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
    ];
}
