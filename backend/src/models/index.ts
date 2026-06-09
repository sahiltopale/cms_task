import User from "./User";
import Post from "./Post";
import PostVersion from "./PostVersion";

User.hasMany(Post, {
  foreignKey: "authorId",
});

Post.belongsTo(User, {
  foreignKey: "authorId",
});

Post.hasMany(PostVersion, {
  foreignKey: "postId",
});

PostVersion.belongsTo(Post, {
  foreignKey: "postId",
});

export { User, Post, PostVersion };
