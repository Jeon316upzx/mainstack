import { IUser } from "../../types/auth";
import { sign } from "jsonwebtoken";
import { config } from "../../validators/env.validator";

const { JWT_SECRET } = config;

export const generateUserToken = ({ _id }: IUser): string => {
  const token = sign({ id: _id }, JWT_SECRET, { expiresIn: 60 * 60 * 60 });
  return token;
};
