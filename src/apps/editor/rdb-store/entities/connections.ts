import { z as yup } from "zod";
import { EntityBaseType, EntityManager } from "@rdb";

const scheme = yup.object({
    nodeId: yup.string(),
    sourcePortId: yup.string(),
    targetNodeId: yup.string()
})

export type ConnectionType = EntityBaseType<typeof scheme._type>

export const ConnectionEntityManager = new EntityManager<ConnectionType>(scheme)