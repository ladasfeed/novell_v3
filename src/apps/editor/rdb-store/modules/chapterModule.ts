import { actionNodeEffects } from "../effects/actionNodeEffects";
import { portEffects } from "../effects/portEffects";
import { basicNodeEffects } from "../effects/sceneNodeEffects";
import { ConnectionEntityManager } from "../entities/connections";
import { NodeEntityManager } from "../entities/nodes";
import { PortEntityManager } from "../entities/port";
import { buildStore } from "@rdb";

export const chaptersRDB = buildStore({
    node: NodeEntityManager,
    port: PortEntityManager,
    connections: ConnectionEntityManager
})

export const chaptersRDBEffects = {
    baseNode: basicNodeEffects(chaptersRDB.store),
    port: portEffects(chaptersRDB.store),
    actionNode: actionNodeEffects(chaptersRDB.store)
}

export type ChaptersRDBStoreType = typeof chaptersRDB['store']

// @ts-ignore
window.chaptersRDB = chaptersRDB


