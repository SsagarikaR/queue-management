import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const logs = sequelize.define("logs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "jobs",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});
