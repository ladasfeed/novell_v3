import { Circle, Group, KonvaNodeComponent, Line } from "react-konva";
import { PortEntityManager } from "../../../rdb-store/entities/port";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { RefObject, useEffect, useRef } from "react";
import * as KonvaLine from "konva/lib/shapes/Line";
import { Container } from "konva/lib/Container";
import { Layer as LayerType } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { chaptersRDBEffects } from "../../../rdb-store/modules/chapterModule";
import { useEntity } from "../../../../../packages/rdb/_core/hooks";
import { Circle as CircleType } from "konva/lib/shapes/Circle";
import { useKonvaHover } from "../../../../../lib/useKonvaHover";
import { DragEventExtended, PosType } from "@/types";
import { PORT_SIZE, UI_ENTITY_NAMES } from "@/configs/editorconfig";

type PropsType = {
  id: string;
  onDragStart?: (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => void;
  onDragEnd?: (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => void;
} & PosType;

const TEMP_LINE_DEFAULT_POINTS = [0, 0, 0, 0];

const getIntersectingBasicNode = (stage: Stage) => {
  const pointerPosition = stage.getPointerPosition()!;

  let intersectingTarget: Container | null = stage
    .getAllIntersections(pointerPosition)
    ?.find((rect) => rect.attrs.name === "BasicNodeBackground")
    ?.parent as unknown as Container;

  return intersectingTarget;
};

const handleOnCreateConnectionDragCollision = (
  e: KonvaEventObject<DragEvent, Node<NodeConfig>>
) => {
  const stage = e.target.getStage()!;
  const layer: LayerType = stage.findOne(
    `.${UI_ENTITY_NAMES.nodesLayer}`
  ) as LayerType;
  const intersectingTarget = getIntersectingBasicNode(e.target.getStage()!);

  // Could be changed to a direct change of styles...
  layer?.children.forEach((node) => {
    chaptersRDBEffects.baseNode.toggleHover(
      node.attrs.id,
      node === intersectingTarget
    );
  });
};

const handleOnDragEndConnectionCollision = (
  e: DragEventExtended,
  currentPortId: string
) => {
  const stage = e.target.getStage()!;
  const layer = stage.findOne<Container>(`.${UI_ENTITY_NAMES.nodesLayer}`);

  layer?.children.forEach((node) => {
    chaptersRDBEffects.baseNode.toggleHover(node.attrs.id, false);
  });

  const intersectingTarget = getIntersectingBasicNode(e.target.getStage()!);

  if (intersectingTarget) {
    chaptersRDBEffects.baseNode.connect({
      portId: currentPortId,
      targetId: intersectingTarget.attrs.id,
    });
  }
};

export const Port = (props: PropsType) => {
  const entity = useEntity(PortEntityManager, props.id);
  const circleRef = useRef<CircleType>(null);
  const lineRef = useRef<KonvaLine.Line<KonvaLine.LineConfig>>(null);
  const hoverHandlers = useKonvaHover(circleRef);

  const onDragStart = (e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    e.cancelBubble = true;
    props.onDragStart?.call(null, e);
  };

  const onDragMove = (e: DragEventExtended) => {
    const stage = e.target.getStage();
    e.target.setPosition({
      x: props.x,
      y: props.y,
    });
    const pointerPosition = stage!.getPointerPosition()!;
    const offset = { x: e.target.parent?.attrs.x, y: e.target.parent?.attrs.y };

    const imageClickX =
      pointerPosition!.x -
      offset.x * stage!.attrs.scaleX -
      stage!.attrs.x -
      props.x * stage!.attrs.scaleX;
    const imageClickY =
      pointerPosition!.y -
      offset.y * stage!.attrs.scaleY -
      stage!.attrs.y -
      props.y * stage!.attrs.scaleX;

    if (lineRef.current) {
      lineRef.current.points([
        0,
        0,
        imageClickX / stage!.attrs.scaleX,
        imageClickY / stage!.attrs.scaleX,
      ]);
    }

    handleOnCreateConnectionDragCollision(e);
  };

  const onDragEnd = (e: DragEventExtended) => {
    props.onDragEnd?.call(null, e);
    handleOnDragEndConnectionCollision(e, entity!.id);
    lineRef.current?.points(TEMP_LINE_DEFAULT_POINTS);
    e.connect = true;
  };

  return (
    <Group
      id={props.id}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      name={UI_ENTITY_NAMES.port}
      onDragMove={onDragMove}
      draggable
      x={props.x}
      y={props.y}
    >
      <Circle
        {...hoverHandlers}
        ref={circleRef}
        fill={entity!.color}
        radius={PORT_SIZE}
      />
      <Line
        stroke="green"
        ref={lineRef}
        strokeWidth={2}
        points={TEMP_LINE_DEFAULT_POINTS}
      />
    </Group>
  );
};
