import {
  BaseNodeType,
  NodeEntityManager,
} from "../../../../../rdb-store/entities/nodes";
import { useEntities } from "../../../../../../../packages/rdb/_core/hooks";
import { chaptersRDBEffects } from "../../../../../rdb-store/modules/chapterModule";
import { Button } from "@/shared/components/Button";
import s from "./styles.module.scss";
import { InfoRow } from "@/shared/components/InfoRow";
import React from "react";

export const ChapterGUI = () => {
  const nodes = useEntities(NodeEntityManager);

  const addNodeHandler = (type: "basic" | "action") => {
    chaptersRDBEffects.baseNode.create({ type });
  };

  const nodesByType = {
    basic: nodes.filter((n) => n.type === "basic"),
    action: nodes.filter((n) => n.type === "action"),
  };

  return (
    <div className={s.container}>
      <div className={s.section}>
        <InfoRow text="Scene Nodes">
          <Button onClick={() => addNodeHandler("basic")}>Add</Button>
        </InfoRow>
        <ul className={s.nodesList}>
          {nodesByType.basic.map((item) => (
            <NodeItem entity={item} />
          ))}
        </ul>
      </div>

      <div className={s.section}>
        <InfoRow text="Action Nodes">
          <Button onClick={() => addNodeHandler("action")}>Add</Button>
        </InfoRow>
        <ul className={s.nodesList}>
          {nodesByType.action.map((item) => (
            <NodeItem entity={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const NodeItem = React.memo(({ entity }: { entity: BaseNodeType }) => {
  const onDoubleClickHander = () => {
    chaptersRDBEffects.baseNode.removeNode(entity.id);
  };

  return (
    <div className={s.nodeItem} onDoubleClick={onDoubleClickHander}>
      {entity.id}
    </div>
  );
});
