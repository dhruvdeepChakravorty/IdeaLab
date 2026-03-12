import { AuthRequest } from "../types/express.d";
import { Response } from "express";
import { versionSchema } from "../types/version.types";
import Idea from "../models/idea";
import Version from "../models/version";

export const createVersion = async (req: AuthRequest, res: Response) => {
  const result = versionSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(401).json({ message: result.error.issues });
  }
  const { explanation } = result.data;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;
  const { ideaId } = req.params;
  const foundIdea = await Idea.findById(ideaId);
  if (!foundIdea) {
    return res.status(404).json({ message: "Idea not found" });
  }
  if (foundIdea.userId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "User unathorized to create version" });
  }
  const version = await Version.countDocuments({ ideaId });
  const currVersionNum = version + 1;

  const createdVersion = await Version.create({
    ideaId: ideaId,
    explanation: explanation,
    versionNum: currVersionNum,
    aiOutput: "AI output here",
  });

  res.status(201).json({
    message: "version Created",
    createdVersion,
  });
};

export const getAllVersions = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;
  const { ideaId } = req.params;
  const foundIdea = await Idea.findById(ideaId);
  if (!foundIdea) {
    return res.status(404).json({ message: "Idea not found" });
  }
  if (foundIdea.userId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "User unathorized to create version" });
  }

  const allVersions = await Version.find({ ideaId });

  res.status(200).json({ allVersions });
};

export const getLatestVersion = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;
  const { ideaId } = req.params;
  const foundIdea = await Idea.findById(ideaId);
  if (!foundIdea) {
    return res.status(404).json({ message: "Idea not found" });
  }
  if (foundIdea.userId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "User unathorized to create version" });
  }
  const latestVersion = await Version.findOne({ ideaId }).sort({
    createdAt: -1,
  });

  if (!latestVersion) {
    return res.status(200).json({ message: "No versions yet" });
  }
  res.status(200).json({
    message: "Version Found",
    latestVersion,
  });
};
