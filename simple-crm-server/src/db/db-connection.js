import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = process.env.npm_command === "test"
  ? new Sequelize('sqlite::memory:', { logging: false })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mssql",
      }
    );

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Export the initialized Sequelize instance and the connection test function
export { sequelize, testDatabaseConnection };
