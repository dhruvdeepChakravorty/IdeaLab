import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../types/auth.types";
import User from "../models/user";
import bcrypt from "bcrypt";
import generateToken from "../config/jwt";

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

  const token = generateToken(newUser._id.toString());
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      message: "User created",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      
    });
};

export const loginUser = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error.issues });
  }
  const { identifier, password } = result.data;
  const foundUser = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (!foundUser) {
    return res.status(404).json({ message: "User not Found" });
  }

  const passwordCheck = await bcrypt.compare(password, foundUser.password);

  if (!passwordCheck) {
    return res.status(401).json({ message: "Wrong Password" });
  }
  const token = generateToken(foundUser._id.toString());
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      message: "User logged in",
      token,
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
    });
};
