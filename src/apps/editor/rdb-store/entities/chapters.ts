import { EntityBaseType, EntityManager } from "@rdb";
import { z as yup } from "zod";

const scheme = yup.object({
    title: yup.string().optional(),
})

export type ChapterType = EntityBaseType<typeof scheme._type>

export const ChaptersEntityManager = new EntityManager<ChapterType>(scheme)