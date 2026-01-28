import { Comment, Post } from "../models/index.js";

export async function fetchCommentsByPostId(req, res) {
  try {
    const id = req.params.id;

    if (!id) res.status(400).json({ message: "Please provide a valid id" });

    const comments = await Comment.findAll({
      where: {
        postId: id,
      },
    });

    if (!comments) res.status(200).json({ message: "Couldn't find comments" });

    res.status(200).json(comments);
  } catch (error) {
    res.status(200).json({ message: "Cannot fetch comments for that post" });
  }
}
