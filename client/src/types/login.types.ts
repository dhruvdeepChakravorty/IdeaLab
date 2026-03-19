import {z} from "zod"

export const loginSchema= z.object({
    identifier:z.string().min(1,"Username or Email Required"),
    password:z.string().min(4,"Password must be atleast 4 character")
})

export type LoginFormData = z.infer<typeof loginSchema>;