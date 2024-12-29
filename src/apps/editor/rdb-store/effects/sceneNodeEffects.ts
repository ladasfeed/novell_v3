import { ChaptersRDBStoreType } from "../modules/chapterModule";
import { baseNodeEffects } from "./baseNodeEffects";

export const basicNodeEffects = (store: ChaptersRDBStoreType) => {

    return {
        ...baseNodeEffects(store, 'node')
    }
}