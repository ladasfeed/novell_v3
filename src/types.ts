import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { ReactNode } from "react";

export type DragEventExtended = KonvaEventObject<DragEvent, Node<NodeConfig>> & {
    connect: boolean
}

export type ChapterType = {
    id: string,
    state: {
        node: any[],
        port: any[],
        connections: any[]
    }
}

export type EditorRouterParams = {
    novellId: string,
    chapterId?: string
}

export type NovellType = { id: string, image?: string; title: string, chapters: any[], assets: any }
export type NovellMetaType = Exclude<NovellType, 'chapters'>

export type PosType = {
    x: number;
    y: number;
};





export type ChildrenPropsType = {
    children?: ReactNode
}