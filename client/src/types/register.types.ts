import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username Required"),
  email: z.email().min(1, "Email Required"),
  password: z.string().min(4, "Password must be atleast 4 character"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
