import { NextFunction, Request, Response } from "express";
import { createJob, getJob, removeJob, updateJob } from "../service/jobs";
import { JOB } from "../utils/constants";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobType, status, progress, logs } = req.body;
    const job = await createJob(jobType, status, progress, logs);
    res.status(200).json({ message: JOB.CREATED_SUCCESSFULLY, result: job });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { jobType, status, progress, logs } = req.body;
    const job = await updateJob(Number(id), {
      jobType,
      status,
      progress,
      logs,
    });
    res.status(200).json({ message: JOB.UPDATED_SUCCESSFULLY, result: job });
  } catch (err) {
    next(err);
  }
};

export const fetch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchKey, searchData, page = 1, limit = 10 } = req.query;
    const job = await getJob(
      searchKey as string,
      searchData as string,
      Number(page),
      Number(limit)
    );

    res.status(200).json({ message: JOB.FETCHED_SUCCESSFULLY, result: job });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const remove = await removeJob(Number(id));

    res.status(200).json({ message: JOB.DELETED_SUCCESSFULLY });
  } catch (err) {
    next(err);
  }
};
