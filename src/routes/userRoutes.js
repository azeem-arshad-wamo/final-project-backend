import { Router } from "express";
import { body } from "express-validator";
import { createNewUser } from "../controllers/userController.js";

const router = Router();

router.post(
  "/",
  [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name cannot be empty"),
    body("lastName").trim().notEmpty().withMessage("Last name cannot be empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Email should be valid"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  createNewUser,
);

export default router;
