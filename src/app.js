import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import passport from "passport";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import "./auth/passport.js";
import cors from "cors";
import { sequelize } from "./db/database.js";

const app = express();

const SequelizeStoreInstance = new SequelizeStore(session.Store);
export const sessionStore = new SequelizeStoreInstance({
  db: sequelize,
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Works" });
});

export default app;
