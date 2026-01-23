import { Op } from "sequelize";
import { Post } from "../models/index.js";

export async function createPost(req, res) {
  try {
    const { title, blocks } = req.body;
    const user = req.user;

    if (!title || !blocks) {
      return res.status(400).json({ message: "Incomplete Information" });
    }

    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    const existing = await Post.findOne({
      where: {
        title,
      },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Cannot create a post with the same title" });
    }

    const result = await Post.create({
      userId: user.id,
      title,
      blocks,
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
