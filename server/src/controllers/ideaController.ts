import { Response } from "express";
import { ideaSchema } from "../types/idea.types";
import { AuthRequest } from "../types/express.d";
import Idea from "../models/idea";
import Version from "../models/version";

export const createIdea = async (req: AuthRequest, res: Response) => {
  const result = ideaSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error.issues });
  }
  const { title } = result.data;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.id;
  const newIdea = await Idea.create({
    title,
    userId,
  });

  res.status(201).json({
    message: "Idea created",
    idea:newIdea,
  });
};

export const getAllIdeas = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.id;
  const allIdeas = await Idea.find({
    userId: userId,
  });
  res.status(200).json({
    allIdeas,
  });
};

export const getIdeaById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const foundIdea = await Idea.findById(id);
  if (!foundIdea) {
    return res.status(404).json({ message: "Idea not found" });
  }
  res.status(200).json({
    message: "Idea Found",
    foundIdea,
  });
};

export const deleteIdea = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const ideaToDelete = await Idea.findById(id);

  if (!ideaToDelete) {
    return res.status(404).json({ message: "Idea not found" });
  }

  if (ideaToDelete.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await Idea.findByIdAndDelete(id);
  await Version.deleteMany({ ideaId: id });

  res.status(200).json({
    message: "Idea deleted",
    ideaToDelete,
  });
};
