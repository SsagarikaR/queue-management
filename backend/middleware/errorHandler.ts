import { NextFunction, Request, Response } from "express";
export interface CustomErrror {
  statusCode: number;
  message: string;
}
export const errorHandler = async (
  err: CustomErrror,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({ message: message });
};
