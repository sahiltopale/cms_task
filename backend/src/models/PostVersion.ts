import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class PostVersion extends Model {}

PostVersion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contentJson: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PostVersion",
  },
);

export default PostVersion;
