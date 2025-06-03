import { NextFunction, Request, Response } from "express";
import { createLog, getLog, removeLog, updateLog } from "../service/logs";
import { LOGS } from "../utils/constants";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description, jobId } = req.body;

    const log = await createLog(description, jobId);
    res.status(200).json({ message: LOGS.CREATED_SUCCESSFULLY, result: log });
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
    const { description, jobId } = req.body;
    const log = await updateLog(Number(id), {
      description,
      jobId,
    });
    res.status(200).json({ message: LOGS.UPDATED_SUCCESSFULLY, result: log });
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
    const { id } = req.query;

    const log = id ? await getLog(Number(id)) : await getLog();

    res.status(200).json({ message: LOGS.FETCHED_SUCCESSFULLY, result: log });
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

    const remove = await removeLog(Number(id));

    res.status(200).json({ message: LOGS.DELETED_SUCCESSFULLY });
  } catch (err) {
    next(err);
  }
};
