import { z as yup } from "zod";
import { EntityBaseType } from "../../../../packages/rdb/_core/types";
import { positionSchema } from "../schemas";
import { EntityManager } from "@rdb";

const scheme = yup.object({
    imageId: yup.string().optional(),
    ports: yup.array(yup.string()).default([]),
    isActive: yup.boolean().optional(),
    background: yup.string().optional(),
    isRoot: yup.boolean().optional(),
}).merge(positionSchema)

export type BaseNodeType = SceneNodeType | ActionNodeType;

export type SceneNodeType = (EntityBaseType<typeof scheme._type> & {
    type: 'basic',
    data: {
        acts: Array<{
        }>
    }
})
    | ActionNodeType

export type ActionNodeType = (EntityBaseType<typeof scheme._type> & {
    type: 'action',
    data: {
        options: Array<{
            text: string,
            portId: string
        }>
    }
})

export const NodeEntityManager = new EntityManager<BaseNodeType>(scheme);