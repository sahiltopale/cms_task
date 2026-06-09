import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "draft",
    },

    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
  },
);

export default Post;
