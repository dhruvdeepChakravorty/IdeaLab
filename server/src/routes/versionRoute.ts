import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createVersion,
  getAllVersions,
  getLatestVersion,
} from "../controllers/versionController";

const router = express.Router({ mergeParams: true });

router.get("/", protect, getAllVersions);
router.post("/", protect, createVersion);
router.get("/latest", protect, getLatestVersion);

export default router;
