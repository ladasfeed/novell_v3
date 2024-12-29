import { ChaptersRDBStoreType } from "../modules/chapterModule";

export const baseNodeEffects = (store: ChaptersRDBStoreType, type: 'node') => ({
    move(id: string, { x, y }: { x: number, y: number }) {
        store[type].editEntity(id, (node) => ({
            ...node,
            x,
            y
        }))
    },

    create({ type }: { type: 'basic' | 'action' }) {
        switch (type) {
            case "basic":
                const node = store.node.addEntity({
                    ports: [],
                    type,
                    data: {
                        acts: []
                    }
                })

                const port = store.port.addEntity({
                    nodeId: node.id,
                    color: 'red'
                })

                // fuck... something in react is actually ASYNC
                setTimeout(() => {
                    store.node.editEntity(node.id, n => ({
                        ...n,
                        ports: [port.id]
                    }))
                })

                return node
            case "action":
                return store.node.addEntity({
                    ports: [],
                    type,
                    data: {
                        options: []
                    }
                })
        }
    },

    removeNode(id: string) {
        store[type].removeEntity(id);
    },

    addImageToBg(id: string, imageId: string) {
        store[type].editEntity(id, (node => ({
            ...node,
            imageId
        })))
    },

    toggleHover(id: string, value: boolean) {
        const node = store[type].getEntity(id)
        if (node.hover == value) return;

        store[type].editEntity(id, ({
            ...node,
            hover: value
        }))
    },

    toggleRoot(id: string) {
        store[type].editEntity(id, (node) => ({
            ...node,
            isRoot: !node.isRoot
        }))
    },

    connect({ portId, targetId }: { portId: string, targetId: string }) {
        // @ts-ignore
        const existingConnection = store.connections.getEntities('asArray').find(e => e.sourcePortId == portId);
        const portEntity = store.port.getEntity(portId)

        if (existingConnection) {
            store.connections.removeEntity(existingConnection.id, {
                silent: true
            })
        }

        store.port.editEntity(portId, (port) => ({
            ...port,
            targetId
        }));


        store.connections.addEntity({
            nodeId: portEntity.nodeId,
            sourcePortId: portId,
            targetNodeId: targetId
        }, {
            silent: true
        })

        store.connections.notifiyListSubscribers()
    }
})