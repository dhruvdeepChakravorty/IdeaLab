import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import { AuthRequest } from "../types/express.d";
import User from "../models/user";

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, async (req: AuthRequest, res) => {
  const user = await User.findById(req.user?.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" })
})

export default router;
