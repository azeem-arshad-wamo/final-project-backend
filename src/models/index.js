import User from "./User.js";
import Post from "./Post.js";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

export { User, Post };
