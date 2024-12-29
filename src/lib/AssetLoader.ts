import { STATIC_DOMAIN, STATIC_URL } from './../configs/editorconfig';
import { useEffect, useState } from "react";

type PossibleAssetType = 'image' | 'audio'

type PossibleAssetObjectType = null | HTMLImageElement;

type AssetValueType = {
    src: string,
    imageObject: PossibleAssetObjectType
}

type AssetsType = {
    [key in PossibleAssetType]: {
        [id: string]: AssetValueType
    }
}

export class AssetLoader {
    public assets: AssetsType = {
        audio: {},
        image: {}
    };

    constructor() { }

    async getAsset(id: string, src: string, type: PossibleAssetType): Promise<AssetValueType> {
        const cachedValue = this.assets[type][id];

        if (cachedValue && cachedValue.src == src) {
            return cachedValue as any;
        } else {
            const imageObject = new window.Image();
            imageObject.src = STATIC_URL + src;
            const result = new Promise<any>((res) => {
                imageObject.addEventListener('load', () => {
                    res(imageObject)
                });
            })

            // @ts-ignore
            this.assets[type][id] = {
                src
            };

            this.assets[type][id].imageObject = await result;

            return this.assets[type][id] as any
        }
    }
}

const assetLoader = new AssetLoader();

export const useAsset = (type: PossibleAssetType, src?: string, id?: string) => {
    const [asset, setAsset] = useState<AssetValueType>()

    const load = async () => {
        if (src && id) {
            const loadedAsset = await assetLoader.getAsset(id, src, type)
            setAsset(loadedAsset)
        }
    }

    useEffect(() => {
        load()
    }, [src, id])

    return asset
}