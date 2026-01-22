import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../models";
import bcrypt from "bcrypt";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "First name is required" },
        notEmpty: { msg: "First name can't be empty" },
        len: {
          args: [2, 20],
          msg: "First name must be between 2 and 20 characters",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Last name is required" },
        notEmpty: { msg: "Last name can't be empty" },
        len: {
          args: [2, 20],
          msg: "Last name must be between 2 and 20 characters",
        },
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set() {
        throw new Error("Cannot set full name manually");
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: { msg: "Email is already is use" },
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email can't be empty" },
        isEmail: { msg: "Email must be valid" },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      notNull: false,
      validate: {
        notNull: { msg: "Password is required" },
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      notNull: true,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password cannot be empty" },
        len: {
          args: [8, 20],
          msg: "Password must be between 8 - 20 characters",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
    hooks: {
      beforeValidate: (user) => {
        if (user.email) {
          user.email = user.email.trim().toLowerCase();
        }
      },
      beforeCreate: async (user) => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password_hash, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password && user.changed("password")) {
          user.password_hash = await bcrypt.hash(user.password_hash, 10);
        }
      },
    },
  },
);

export default User;
