import { Router } from "express";
import {
  createNewComment,
  fetchCommentsByPostId,
  fetchCurrentUserComments,
  updateComment,
} from "../controllers/commentController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = Router();

// GET /comments
router.get("/", authenticateUser, fetchCurrentUserComments);

// GET /comments/:id
router.get("/:id", fetchCommentsByPostId);

// POST /comment
router.post("/", authenticateUser, createNewComment);

// PATCH /comment
router.patch("/", authenticateUser, updateComment);

export default router;
