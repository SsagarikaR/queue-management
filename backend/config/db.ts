import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

try {
  sequelize.authenticate;
} catch (err) {
  console.log("err connection to db", err);
}

sequelize
  .sync()
  .then((data) => {
    console.log("synced sucesfully");
  })
  .catch((err) => {
    console.log("error insyncing");
  });
