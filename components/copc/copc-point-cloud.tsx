"use client";

import { Copc, Hierarchy } from "copc";
import { useEffect, useState } from "react";
import { CopcNode } from "./copc-node";

export function CopcPointCloud({ filename }: { filename: string }) {
    const [copcInfo, setCopcInfo] = useState<{
        copc: Copc;
        nodeMap: Hierarchy.Node.Map;
    }>();

    useEffect(() => {
        async function loadCopcInfo() {
            const copc = await Copc.create(filename);

            const { nodes } = await Copc.loadHierarchyPage(
                filename,
                copc.info.rootHierarchyPage,
            );

            setCopcInfo({
                copc,
                nodeMap: nodes,
            });
        }

        loadCopcInfo();

        return () => {
            setCopcInfo(undefined);
        };
    }, [filename]);

    if (!copcInfo) {
        return null;
    }

    const { copc, nodeMap } = copcInfo;

    const rootNode = nodeMap["0-0-0-0"]!;

    return (
        <CopcNode
            filename={filename}
            nodeId="0-0-0-0"
            node={rootNode}
            nodeMap={nodeMap}
            copc={copc}
        />
    );
}
