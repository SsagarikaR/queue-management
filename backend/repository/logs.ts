import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db";
import { logs } from "../model/logs";
import { CustomErrror } from "../utils/customError";

export const fetchLogByJobId = async (jobId: number) => {
  try {
    return await logs.findAll({
      where: { jobId },
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const createLogs = async (description: string, jobId: number) => {
  try {
    const log = await logs.create({
      description,
      jobId,
    });
    return log.get({ plain: true });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const updateLogs = async (
  id: number,
  data: {
    description?: string;
    jobId?: number;
  }
) => {
  try {
    return await logs.update(data, {
      where: { id },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const removeLogs = async (id: number) => {
  try {
    return await sequelize.query("DELETE FROM logs WHERE id= :id", {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const fetchLogs = async (id?: number) => {
  try {
    let query = "SELECT * FROM logs ";
    let replacements: { [key: string]: string | number } = {};
    if (id) {
      query += `WHERE jobId= :id`;
      replacements.id = id;
    }

    return await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};
