import { chaptersRDBEffects } from "@/apps/editor/rdb-store/modules/chapterModule";
import { calcualtePositionAreaEntitiesPos } from "@/lib/positions";
import Konva from "konva";
import { RefObject, useMemo } from "react";
import { Group, Circle } from "react-konva";
import { Port } from "../port/Port";

export const BasicNodePortsArea = ({
  nodeId,
  portIds,
  containerRef,
  hideCreatePortButton,
}: {
  nodeId: string;
  portIds: string[];
  hideCreatePortButton?: boolean;
  containerRef: RefObject<Konva.Group>;
}) => {
  const onPortDragStart = () => {
    containerRef.current?.moveToTop();
  };

  const portsAreaEntitiesToRender: Array<{
    type: "port" | "addButton";
    id: string;
  }> = [
    ...portIds.map((p) => ({
      id: p,
      type: "port" as const,
    })),
  ];

  if (!hideCreatePortButton) {
    portsAreaEntitiesToRender.push({
      id: "addButton",
      type: "addButton" as const,
    });
  }

  const portsWithPos = useMemo(
    () => calcualtePositionAreaEntitiesPos(portsAreaEntitiesToRender),
    [portIds.length]
  );

  const onCreatePortButtonHandler = (e: any) => {
    e.cancelBubble = true;
    chaptersRDBEffects.port.create(nodeId);
  };

  return (
    <>
      {portsWithPos.map((entity, index) => {
        switch (entity.type) {
          case "port":
            return (
              <Port
                id={entity.id!}
                x={entity.x}
                y={entity.y}
                key={entity.id}
                onDragStart={onPortDragStart}
              />
            );
          case "addButton":
            return (
              <Group x={entity.x} y={entity.y} key={entity.id}>
                <Circle
                  onClick={onCreatePortButtonHandler}
                  fill={"blue"}
                  radius={15}
                />
              </Group>
            );
        }
      })}
    </>
  );
};
