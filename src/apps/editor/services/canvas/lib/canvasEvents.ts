import Konva from "konva"

export enum CanvasEvents {
    MOVE_NOVE = "MOVE_NODE"
}

export class CanvasEventsEmitter extends EventTarget {
    moveNode(e: Konva.KonvaEventObject<DragEvent>) {
        this.dispatchEvent(new CustomEvent(CanvasEvents.MOVE_NOVE, { detail: e }))
    }
}

export const canvasEventsEmitter = new CanvasEventsEmitter()