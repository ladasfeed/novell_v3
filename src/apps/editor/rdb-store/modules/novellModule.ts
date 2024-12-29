import { buildStore } from "@rdb";
import { assetEffects } from "../effects/assetEffects";
import { AssetEntityManager } from "../entities/assets";
import { ChaptersEntityManager } from "../entities/chapters";

export const novellStore = buildStore({
    assets: AssetEntityManager,
    chapters: ChaptersEntityManager
})

export const novellEffects = {
    asset: assetEffects(novellStore.store),
};

export type NovellStoreType = typeof novellStore['store']


// @ts-ignore
window.novellModule = novellStore