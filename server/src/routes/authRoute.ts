import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
const router = express.Router();
import { protect } from "../middleware/authMiddleware"
import { AuthRequest } from "../types/express.d"

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req:AuthRequest, res) => {
    res.json({ user: req.user })
})

export default router;
