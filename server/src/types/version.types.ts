import z from "zod";

export const versionSchema = z.object({
  explanation: z.string().min(4).trim(),
});
