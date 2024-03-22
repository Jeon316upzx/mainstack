import { Response } from "express";

const successResponseHandler = (
  res: Response,
  statusCode: number,
  data?: any
) => {
  return res.status(statusCode).json({
    success: true,
    data: data,
  });
};

const errorResponseHandler = (
  res: Response,
  statusCode: number,
  error: Error
) => {
  return res.status(statusCode).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export { successResponseHandler, errorResponseHandler };
