import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db";
import { jobs } from "../model/jobs";
import { CustomErrror } from "../utils/customError";

export const fetchJobByType = async (jobType: string) => {
  try {
    return await jobs.findOne({
      where: { jobType },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const createJobs = async (
  jobType: string,
  status: string,
  progress: number,
  logs: string
) => {
  try {
    const job = await jobs.create({
      jobType,
      status,
      progress,
      logs,
    });
    return job.get({ plain: true });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const updateJobs = async (
  id: number,
  data: {
    jobType?: string;
    status?: string;
    progress?: number;
    logs?: string;
  }
) => {
  try {
    return await jobs.update(data, {
      where: { id },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const removeJobs = async (id: number) => {
  try {
    return await sequelize.query("DELETE FROM jobs WHERE id= :id", {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};

export const fetchJobs = async (searchKey?: string, searchData?: string) => {
  try {
    let query = `SELECT * FROM jobs `;
    let replacements: any = {};
    if (searchKey?.trim() && searchData) {
      query += `WHERE ${searchKey}= :searchData`;
      replacements["searchData"] = searchData;
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
