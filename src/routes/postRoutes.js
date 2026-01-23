import { Router } from "express";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import {
  createPost,
  getCurrentUserPosts,
} from "../controllers/postController.js";

const router = Router();

router.get("/", authenticateUser, getCurrentUserPosts);

router.post("/", authenticateUser, createPost);

export default router;
