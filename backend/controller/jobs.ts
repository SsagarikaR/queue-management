import { NextFunction, Request, Response } from "express";
import { createJob, getJob, removeJob, updateJob } from "../service/jobs";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobType, status, progress, logs } = req.body;
    const job = await createJob(jobType, status, progress, logs);
    res.status(200).json({ message: "job created succesfully", result: job });
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
    res.status(200).json({ message: "job updated succesfully", result: job });
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
    const { searchKey, searchData } = req.query;

    const job = await getJob(searchKey as string, searchData as string);

    res.status(200).json({ message: "job fetched succesfully", result: job });
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

    res.status(200).json({ message: "job deleted succesfully" });
  } catch (err) {
    next(err);
  }
};
