import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2).trim(),
  email: z.email(),
  password: z.string().min(4),
});

export const loginSchema = z.object({
  identifier: z.string().min(2).trim(),
  password: z.string().min(4),
});

