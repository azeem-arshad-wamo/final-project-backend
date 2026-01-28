import { Router } from "express";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import {
  createPost,
  fetchAllPosts,
  getCurrentUserPosts,
  getPostById,
} from "../controllers/postController.js";

const router = Router();

// GET /post
router.get("/", authenticateUser, getCurrentUserPosts);

// POST /post
router.post("/", authenticateUser, createPost);

// GET /post/view
router.get("/view", getPostById);

// GET /post/view/all
router.get("/view/all", fetchAllPosts);

export default router;
