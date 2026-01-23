import { Router } from "express";
import { authenticateUser } from "../middlewares/userMiddleware.js";
import { createPost } from "../controllers/postController.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Post Route Working" });
});

router.post("/", authenticateUser, createPost);

export default router;
