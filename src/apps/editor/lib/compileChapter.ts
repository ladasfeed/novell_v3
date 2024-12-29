import { NodeCompiled } from "@/compiledTypes";
import { ChaptersRDBStoreType } from "../rdb-store/modules/chapterModule";


export const compileNovell = () => {

}


export const compileChapter = (store: ChaptersRDBStoreType): {
    rootId: string,
    nodes: NodeCompiled[]
} => {
    const nodes = store.node.getEntities('asObject');
    const connections = store.connections.getEntities('asObject');
    const nodesAsArray = store.node.getEntities('asArray');
    const connectionsAsArray = store.connections.getEntities('asArray');
    const ports = store.port.getEntities('asObject')
    const result: Array<NodeCompiled> = [];

    // find a root node
    const rootNode = nodesAsArray.find(n => n.isRoot)!;

    nodesAsArray.forEach((node) => {
        switch (node.type) {
            case "basic": {
                result.push({
                    type: 'basic',
                    id: node.id,
                    background: node.background,
                    next: ports[node.ports?.[0]]?.targetId,
                    acts: node.data.acts,
                    isRoot: node.isRoot
                })
                return
            }
            case "action":
                result.push({
                    type: 'action',
                    id: node.id,
                    background: node.background,
                    options: node.data.options.map(o => {
                        return {
                            text: o.text,
                            next: ports[o.portId]?.targetId
                        }
                    }),
                    isRoot: node.isRoot
                })
                return
        }
    })

    return {
        rootId: rootNode.id,
        nodes: result,
    }
}

// Output
const outputExample: NodeCompiled[] = [
    {
        type: 'basic',
        id: '1',
        next: '2',
        acts: []
    },
    {
        type: 'action',
        id: '2',
        options: [
            {
                text: 'Left?',
                next: '2',
            },
            {
                text: 'Rigth?',
                next: '2',
            }
        ]
    },
    {
        type: 'basic',
        id: '3',
        acts: []
    },
    {
        type: 'basic',
        id: '4',
        acts: []
    },
]