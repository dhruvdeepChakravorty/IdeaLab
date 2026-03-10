import { z } from "zod";

export const ideaSchema = z.object({
    title: z.string().min(4).trim()
})