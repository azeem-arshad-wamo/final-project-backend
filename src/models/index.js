import User from "./User.js";
import Post from "./Post.js";
import Comment from "./Comment.js";

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

export { User, Post, Comment };
