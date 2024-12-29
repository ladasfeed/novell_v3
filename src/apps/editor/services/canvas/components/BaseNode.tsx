import { Group, Image, Rect, Text } from "react-konva";
import { BaseNodeType } from "../../../rdb-store/entities/nodes";
import Konva from "konva";
import React, { ReactNode, useRef } from "react";
import { useAsset } from "../../../../../lib/AssetLoader";
import { AssetEntityManager } from "../../../rdb-store/entities/assets";
import { setCursorType } from "../../../../../lib/cursorChanger";
import { chaptersRDBEffects } from "../../../rdb-store/modules/chapterModule";
import { useEntity } from "../../../../../packages/rdb/_core/hooks";
import { useActiveNode } from "../../../zustand-store/useActiveNode";
import { canvasEventsEmitter } from "../lib/canvasEvents";
import { BasicNodePortsArea } from "./BaseNodePortsArea";

const IMG =
  "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg";

export const BasicNode = React.memo(
  ({
    entity,
    hideCreatePortButton,
    children = null,
  }: {
    hideCreatePortButton?: boolean;
    entity: BaseNodeType;
    children?: ReactNode;
  }) => {
    const containerRef = useRef<Konva.Group>(null);
    const { activeNodeId, setActiveNodeId } = useActiveNode();
    const imageEntity = useEntity(AssetEntityManager, entity?.imageId);
    const backgroundImage = useAsset(
      "image",
      imageEntity?.src,
      imageEntity?.id
    );

    const onDragStart = () => {
      setCursorType("grabbing");
      containerRef.current?.moveToTop();
    };

    const onDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
      setCursorType("pointer");
      // @ts-ignore
      if (event.connect) {
        return;
      }

      chaptersRDBEffects.baseNode.move(entity.id, {
        x: Math.floor(event.target.attrs.x),
        y: Math.floor(event.target.attrs.y),
      });
    };

    const onClickHandler = () => {
      setActiveNodeId(entity.id);
    };

    const onDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
      canvasEventsEmitter.moveNode(e);
    };

    const interactionEffects = (function () {
      if (entity.id === activeNodeId) {
        return {
          stroke: "red",
          strokeWidth: 5,
        };
      }

      if (entity.hover) {
        return {
          shadowColor: "black",
          shadowBlur: 10,
          shadowOffset: { x: 0, y: 0 },
          shadowOpacity: 0.5,
        };
      }

      return {};
    })();

    const onMouseEnter = () => {
      chaptersRDBEffects.baseNode.toggleHover(entity.id, true);

      setCursorType("pointer");
    };

    const onMouseLeave = () => {
      chaptersRDBEffects.baseNode.toggleHover(entity.id, false);

      setCursorType("default");
    };

    return (
      <Group
        ref={containerRef}
        name="BasicNode"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClickHandler}
        x={entity.x}
        y={entity.y}
        draggable={true}
        width={200}
        id={entity.id}
        height={150}
      >
        <Rect
          name="BasicNodeBackground"
          fill="black"
          width={200}
          cornerRadius={15}
          height={150}
          {...interactionEffects}
        />
        {backgroundImage?.imageObject && (
          <Image
            cornerRadius={15}
            image={backgroundImage?.imageObject}
            width={200}
            height={150}
          />
        )}
        <Text text={entity.id} x={20} y={20} fontSize={20} fill={"white"} />
        <BasicNodePortsArea
          nodeId={entity.id}
          portIds={entity.ports}
          containerRef={containerRef}
          hideCreatePortButton={hideCreatePortButton}
        />
        {children}
      </Group>
    );
  }
);
