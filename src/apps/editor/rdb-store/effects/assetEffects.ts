import { AssetType } from "../entities/assets"
import { NovellStoreType } from "../modules/novellModule"

export const assetEffects = (store: NovellStoreType) => ({
    create(type: AssetType['type'], src: string) {
        return store.assets.addEntity({
            type,
            src
        })
    },

    edit(id: string, src: string) {
        return store.assets.editEntity(id, (asset) => ({
            ...asset,
            src
        }))
    }
})