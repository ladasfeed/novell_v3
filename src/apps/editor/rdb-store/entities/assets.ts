import { EntityBaseType, EntityManager } from "@rdb";
import { z as yup } from "zod";

const scheme = yup.object({
    src: yup.string(),
    type: yup.enum(['audio', 'image'])
})

export type AssetType = EntityBaseType<typeof scheme._type>

export const AssetEntityManager = new EntityManager<AssetType>(scheme)