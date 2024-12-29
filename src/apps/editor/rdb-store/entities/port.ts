import { z as yup } from "zod";
import { EntityManager } from "@rdb";
import { EntityBaseType } from "../../../../packages/rdb/_core/types";

const scheme = yup.object({
    color: yup.enum(['red', 'black']).default('black').optional(),
    nodeId: yup.string(),
    targetId: yup.string().optional(),
    localId: yup.string().optional()
})

export type PortType = EntityBaseType<typeof scheme._type>;

export const PortEntityManager = new EntityManager<PortType>(scheme);