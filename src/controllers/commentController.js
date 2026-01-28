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

export async function createNewComment(req, res) {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!postId || !content)
      return res.status(400).json({ message: "Content not provided" });
    if (!userId) return res.status(400).json({ message: "User not logged in" });

    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!post)
      return res.status(400).json({
        message: "Could not find the post you're looking to commment on",
      });

    const result = await Comment.create({
      postId: post.id,
      userId: userId,
      content,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Could not create a comment" });
  }
}
