import { Op } from "sequelize";
import { Post, User } from "../models/index.js";

export async function fetchAllPosts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { rows: posts, count: total } = await Post.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    if (!posts) res.status(400).json({ message: "Cannot find posts" });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      posts,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Couldn't fetch user information",
      error: error.message,
    });
  }
}

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

export async function getCurrentUserPosts(req, res) {
  try {
    if (!req.user) {
      res.status(400).json({
        message: "Could not find current logged in user",
      });
    }

    const posts = await Post.findAll({
      where: {
        userId: req.user.id,
      },
    });

    if (!posts) {
      res
        .status(400)
        .json({ message: "Could not find posts for current user" });
    }

    res.status(200).json({
      currentUser: req.user.fullName,
      posts: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching current logged in user posts",
      error: error.message,
    });
  }
}

export async function getPostById(req, res) {
  try {
    const id = req.query.id;

    if (!id) throw new Error("Id not provided");

    const post = await Post.findByPk(id);

    if (!post) throw new Error("Could not find post for that id");

    res.status(200).json({
      id: post.id,
      title: post.title,
      userId: post.userId,
      blocks: post.blocks,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching post",
      error: error.message,
    });
  }
}
