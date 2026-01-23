import passport from "passport";
import User from "../models/User.js";
import { validationResult } from "express-validator";

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

    res.status(200).json({
      message: "User Created Successfully",
      user: {
        id: result.id,
        name: result.fullName,
        email: result.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
