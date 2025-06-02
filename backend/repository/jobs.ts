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

export const fetchJobs = async (
  searchKey?: string,
  searchData?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const offset = (page - 1) * pageSize;
    let query = `SELECT * FROM jobs `;
    let countQuery = `SELECT COUNT(*) as total FROM jobs `;
    let replacements: any = {};
    if (searchKey?.trim() && searchData) {
      query += `WHERE ${searchKey}= :searchData`;
      replacements["searchData"] = searchData;
    }
    query += `ORDER BY createdAt DESC `;
    query += `LIMIT :limit OFFSET :offset`;
    replacements["limit"] = pageSize;
    replacements["offset"] = offset;

    const jobs = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });
    const countResults = await sequelize.query(countQuery, {
      replacements: searchKey?.trim() && searchData ? { searchData } : {},
      type: QueryTypes.SELECT,
    });
    const totalCount = (countResults[0] as any).total;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      jobs,
      totalCount,
      totalPages,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomErrror(err.message, 400);
    }
  }
};
