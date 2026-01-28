import { Router } from "express";
import {
  createNewComment,
  fetchCommentsByPostId,
} from "../controllers/commentController.js";
import { authenticateUser } from "../middlewares/userMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.json("YEAH");
});

router.get("/:id", fetchCommentsByPostId);

// POST /comment
router.post("/", authenticateUser, createNewComment);

export default router;
