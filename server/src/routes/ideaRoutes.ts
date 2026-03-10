import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createIdea,
  deleteIdea,
  getAllIdeas,
  getIdeaById,
} from "../controllers/ideaController";

const router = express.Router();

router.get("/", protect, getAllIdeas);
router.post("/", protect, createIdea);
router.get("/:id", protect, getIdeaById);
router.delete("/:id", protect, deleteIdea);

export default router;