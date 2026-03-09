import { Request, Response } from "express";
import registerSchema from "../types/auth.types";
import User from "../models/user";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error.issues });
  }
  const { username, email, password } = result.data;
  

  const checkEmailAlreadyExist = await User.findOne({ email });
  if (checkEmailAlreadyExist) {
    return res
      .status(400)
      .json({ message: "User already exist, Please log in" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  if (!newUser) {
    return res.status(500).json({ message: "Error While creating User" });
  }
   res.status(200).json({ message: "User created", newUser });
};
