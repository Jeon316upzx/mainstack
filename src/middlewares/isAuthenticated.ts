import { NextFunction, Request, Response } from "express";
import { RequestWithUserId } from "../types/auth";
import { verify } from "jsonwebtoken";
import { config } from "../validators/env.validator";
import { errorResponseHandler } from "../utils/response";

const { JWT_SECRET } = config;

export const isAuthenticated = (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return errorResponseHandler(res, 401, new Error("Request Unauthorized"));
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return errorResponseHandler(res, 401, new Error("Request Unauthorized"));
  }

  verify(token, JWT_SECRET as string, (err: any, decodedToken: any) => {
    if (err)
      return errorResponseHandler(res, 401, new Error("Request Forbidden"));
    req.user = decodedToken;
    return next();
  });
};
