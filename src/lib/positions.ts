import { NODE_SIZE, PORT_SIZE, PORTS_GAP } from "@/configs/editorconfig";
import { PosType } from "@/types";

export const getTargetConnectionPos = (pos: PosType) => {
    return {
        x: pos.x + NODE_SIZE.width / 2 - 1,
        y: pos.y
    }
}

export const getPortConnectionPos = (pos: PosType) => {
    return {
        x: pos.x + 1,
        y: pos.y + 1,
    }
}

export const calcualtePositionAreaEntitiesPos = (entities: Array<{ id?: string, type: 'port' | 'addButton' }>): Array<{ id?: string, type: 'port' | 'addButton' } & PosType> => {
    const x = NODE_SIZE.width / 2 - (entities.length * PORT_SIZE * 2 + (entities.length - 1) * PORTS_GAP) / 2;

    return entities.map((entity, index) => ({
        ...entity,
        x: (x + index * (PORT_SIZE * 2 + PORTS_GAP)) + PORT_SIZE,
        y: NODE_SIZE.height
    }))
}