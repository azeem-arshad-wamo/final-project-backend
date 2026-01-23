import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/index.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });

        if (!user)
          return done(null, false, {
            message: "Cannot find user with that email",
          });

        const checkPass = await user.comparePassword(password);

        if (!checkPass)
          return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
