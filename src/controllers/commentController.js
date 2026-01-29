import { Comment, Post } from "../models/index.js";

export async function fetchCommentsByPostId(req, res) {
  try {
    const id = req.params.id;

    if (!id)
      return res.status(400).json({ message: "Please provide a valid id" });

    const comments = await Comment.findAll({
      where: {
        postId: id,
      },
    });

    if (!comments)
      return res.status(200).json({ message: "Couldn't find comments" });

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

export async function fetchCurrentUserComments(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) throw new Error("User not logged in");

    const comments = await Comment.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Post,
        as: "post",
        attributes: ["id", "title"],
      },
    });

    if (!comments.length) throw new Error("Couldn't find comments");

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateComment(req, res) {
  try {
    const { commentId, postId, content } = req.body;
    const userId = req.user.id;

    if (!postId || !content) throw new Error("Incomplete Information");
    if (!userId) throw new Error("User not logged in!");

    const comment = await Comment.findOne({
      where: {
        id: commentId,
        postId: postId,
      },
    });

    if (!comment) throw new Error("Cannot find comment with that information");

    comment.content = content;

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
}
