import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../models";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blocks: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
      validate: {
        notEmpty: { msg: "Blocks cannot be empty" },
        isArray(value) {
          if (!Array.isArray(value)) throw new Error("Blocks must be an array");
        },
      },
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
