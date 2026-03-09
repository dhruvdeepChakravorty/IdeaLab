 // This tells TypeScript that req.user is valid.
import { Request } from "express"

export interface AuthRequest extends Request {
    user?: {
        id: string
    }
}

