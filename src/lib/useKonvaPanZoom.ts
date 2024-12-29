import { useState, useRef, RefObject } from "react";
import { Stage as StageType } from "konva/lib/Stage";

export const useReactKonvaPanZoom = (stageRef: RefObject<StageType>) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // A small workaround for stageRef to be set

    const handleWheel = (event: any) => {
        event.evt.preventDefault();
        const currentStageRef = stageRef.current;

        if (currentStageRef) {
            const stage = currentStageRef!.getStage();

            if (event.evt.ctrlKey) {
                const oldScale = stage.scaleX();

                const mousePointTo = {
                    x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
                    y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
                };

                const unboundedNewScale = oldScale - event.evt.deltaY * 0.01;
                let newScale = unboundedNewScale;
                if (unboundedNewScale < 0.1) {
                    newScale = 0.1;
                } else if (unboundedNewScale > 10.0) {
                    newScale = 10.0;
                }

                const newPosition = {
                    x:
                        -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) *
                        newScale,
                    y:
                        -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) *
                        newScale,
                };

                setScale(newScale);
                setPosition(newPosition);
            } else {
                const dragDistanceScale = 0.75;
                const newPosition = {
                    x: position.x - dragDistanceScale * event.evt.deltaX,
                    y: position.y - dragDistanceScale * event.evt.deltaY,
                };

                setPosition(newPosition);
            }
        }
    };

    return {
        scale, position, handleWheel
    }
}