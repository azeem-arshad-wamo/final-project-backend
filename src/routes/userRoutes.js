import { Router } from "express";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "User route working" });
});

router.get("/test", createUser);

export default router;
