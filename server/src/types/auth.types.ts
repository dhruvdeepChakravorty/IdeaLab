import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(2).trim(),
  email: z.email(),
  password: z.string().min(4),
});

export default registerSchema;
