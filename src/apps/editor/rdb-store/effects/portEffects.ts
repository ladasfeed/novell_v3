import { PortType } from "../entities/port";
import { ChaptersRDBStoreType } from "../modules/chapterModule";

export const portEffects = (store: ChaptersRDBStoreType) => ({
    create(nodeId: string) {
        const port = store.port.addEntity({ nodeId, color: 'red' });

        return store.node.editEntity(nodeId, (node) => {
            node.ports.push(port.id)
            return node
        })
    },

    remove(portId: string) {
        const nodeId = store.port.entities[portId].nodeId;

        return store.node.editEntity(nodeId, (node) => {
            node.ports = node.ports.filter(p => p !== portId)
            return node
        })
    },

    editColor: (portId: string, color: PortType['color']) => {
        store.port.editEntity(portId, (port) => {
            port.color = color
            return port
        })
    }
})