import User from "../models/User.js";

export async function createUser(req, res) {
  try {
    console.log("TEST");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
