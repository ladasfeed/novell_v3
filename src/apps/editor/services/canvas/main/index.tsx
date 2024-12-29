import { Stage as StageType } from "konva/lib/Stage";
import { useRef } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { useReactKonvaPanZoom } from "../../../../../lib/useKonvaPanZoom";
import { useRenderAfterInit } from "../../../../../lib/useRenderAfterInit";
import { Connections } from "../connections";
import { NodesLayer } from "../nodes-layer";
import { StageProvider } from "../chapterCanvasProvider";
import s from "./styles.module.scss";
import { useActiveNode } from "../../../zustand-store/useActiveNode";
import Konva from "konva";

export const CanvasEntry = () => {
  const stageElementRef = useRef<StageType>(null);
  const { setActiveNodeId } = useActiveNode();

  const { handleWheel, position, scale } =
    useReactKonvaPanZoom(stageElementRef);

  useRenderAfterInit();

  const onEmptyAreaClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target.id() === "background") {
      setActiveNodeId(null);
    }
  };

  return (
    <Stage
      scaleX={scale}
      scaleY={scale}
      onWheel={handleWheel}
      ref={stageElementRef}
      x={position.x}
      y={position.y}
      width={window.innerWidth - 600}
      height={window.innerHeight}
      onClick={onEmptyAreaClick}
      className={s.container}
    >
      <Layer>
        <Rect
          id="background"
          fill="gray"
          width={window.innerWidth - 200}
          height={window.innerHeight - 100}
        />
      </Layer>

      <StageProvider stage={stageElementRef.current!}>
        {stageElementRef.current && (
          <>
            <Connections />
            <NodesLayer />
          </>
        )}
      </StageProvider>
    </Stage>
  );
};
