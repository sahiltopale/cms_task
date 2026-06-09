import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        message: "Email already exists",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid Credentials",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, (user as any).passwordHash);

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid Credentials",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: (user as any).id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
