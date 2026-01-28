import { Router } from "express";
import { fetchCommentsByPostId } from "../controllers/commentController.js";

const router = Router();

router.get("/", (req, res) => {
  res.json("YEAH");
});

router.get("/:id", fetchCommentsByPostId);

export default router;
