import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json("YEAH");
});

export default router;
