import { ActionNodeType } from "../entities/nodes"
import { ChaptersRDBStoreType } from "../modules/chapterModule"

export const actionNodeEffects = (store: ChaptersRDBStoreType) => {
    return {
        saveOptions(nodeId: string, options: Array<any>) {
            store.node.editEntity(nodeId, node => ({
                ...node,
                data: {
                    options
                }
            }) as ActionNodeType)
        }
    }
}