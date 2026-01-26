import passport from "passport";
import { validationResult } from "express-validator";
import { User, Post } from "../models/index.js";

export async function createNewUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors });
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      throw new Error("Incomplete Information");

    const existing = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existing) throw new Error("User already exists");

    const result = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    req.login(result, (err) => {
      if (err) {
        console.error("Login after signup failed:", err);
        return res.status(500).json({ message: "Login failed after signup" });
      }

      return res.status(200).json({
        message: "User Created Successfully",
        user: {
          id: result.id,
          fullName: result.fullName,
          email: result.email,
        },
      });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getCurrentUserInfo(req, res) {
  try {
    if (!req.user) throw new Error("User not found");

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: {
        model: Post,
        as: "posts",
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Cannot find user " });
    }

    res.status(200).json({
      message: "success",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      posts: user.posts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function logOutUser(req, res) {
  try {
    req.logout((error) => {
      if (error) {
        return res.status(500).json({ message: "Logout Failed" });
      }

      req.session.destroy((error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Session Destruction Failed" });
        }

        res.clearCookie("connect.sid", {
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "none",
        });

        return res.status(200).json({ message: "Logged Out Successfully" });
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
