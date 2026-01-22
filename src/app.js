import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Works" });
});

export default app;
