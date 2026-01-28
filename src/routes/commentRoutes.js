import { Router } from "express";
import {
  createNewComment,
  fetchCommentsByPostId,
  fetchCurrentUserComments,
} from "../controllers/commentController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = Router();

// GET /comments
router.get("/", authenticateUser, fetchCurrentUserComments);

// GET /comments/:id
router.get("/:id", fetchCommentsByPostId);

// POST /comment
router.post("/", authenticateUser, createNewComment);

export default router;
