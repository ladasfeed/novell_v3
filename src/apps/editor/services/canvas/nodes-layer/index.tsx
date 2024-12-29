import React, { useRef } from "react";
import { Layer } from "react-konva";
import { NodeEntityManager } from "../../../rdb-store/entities/nodes";
import { useEntities } from "../../../../../packages/rdb/_core/hooks";
import { Layer as LayerType } from "konva/lib/Layer";
import { ActNode } from "../components/SceneNode";
import { ActionNode } from "../components/ActionNode";

export const NodesLayer = React.memo(() => {
  const nodes = useEntities(NodeEntityManager);
  const containerRef = useRef<LayerType | null>(null);

  return (
    <Layer name="NodesLayer" ref={containerRef}>
      {nodes.map((node) => {
        switch (node.type) {
          case "basic":
            return <ActNode key={node.id} {...node} />;
          case "action":
            return <ActionNode key={node.id} {...node} />;
        }
      })}
    </Layer>
  );
});
