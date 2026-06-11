import User from "./User";
import Post from "./Post";
import PostVersion from "./PostVersion";

User.hasMany(Post, {
  foreignKey: "authorId",
  as: "posts",
});

Post.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

Post.hasMany(PostVersion, {
  foreignKey: "postId",
  as: "versions",
});

PostVersion.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});

export { User, Post, PostVersion };
