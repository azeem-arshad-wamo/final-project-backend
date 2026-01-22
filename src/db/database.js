import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
);

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection Successful!");
  } catch (error) {
    console.error("Connection Errror");
    console.error(error);
  }
}
