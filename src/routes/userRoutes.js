import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  createNewUser,
  getCurrentUserInfo,
  logOutUser,
} from "../controllers/userController.js";
import passport from "passport";
import {
  authenticateUser,
  validateRequest,
} from "../middlewares/userMiddleware.js";

const router = Router();

router.get("/", authenticateUser, getCurrentUserInfo);

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
  validateRequest,
  createNewUser,
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors });

    try {
      passport.authenticate("local", (error, user, info) => {
        if (error)
          return res
            .status(500)
            .json({ message: error.message || "Authentication error" });

        if (!user)
          return res
            .status(401)
            .json({ message: info?.message || "Invalid credentials" });

        req.session.regenerate((error) => {
          if (error) return res.status(500).json({ message: "Session error" });

          req.login(user, (error) => {
            if (error) return res.status(500).json({ message: "Login error" });

            return res.status(200).json({
              message: "Success",
              user: {
                id: user.id,
                email: user.email,
              },
            });
          });
        });
      })(req, res, next);
    } catch (error) {
      console.error(error.message);
    }
  },
);

router.get("/logout", authenticateUser, logOutUser);

export default router;
