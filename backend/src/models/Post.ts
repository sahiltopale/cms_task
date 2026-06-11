import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Post extends Model {
  declare id: string;
  declare slug: string;
  declare status: "draft" | "published";
  declare authorId: string;
}

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

    tableName: "Posts",

    timestamps: true,
  },
);

export default Post;
