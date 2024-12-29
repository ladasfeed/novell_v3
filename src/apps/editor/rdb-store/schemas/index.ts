import { z as yup } from "zod"

export const positionSchema = yup.object({
    x: yup.number().default(0).optional(),
    y: yup.number().default(0).optional(),
})