import { validationResult } from "express-validator";

export async function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next();
}

export async function authenticateUser(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(400).json({ message: "User not logged in!" });
  }

  next();
}
