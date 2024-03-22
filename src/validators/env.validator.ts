import dotenv from "dotenv";
import { schema } from "./envSchema/env.schema";
import { EnvConfig } from "../configs/env.config";
dotenv.config();

const data = {
  SERVER_PORT: process.env.SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,
};
const { value, error } = schema.validate(data);
if (error) throw new Error(`Validation error: ${error.message}`);

export const config: EnvConfig = {
  SERVER_PORT: value.SERVER_PORT,
  JWT_SECRET: value.JWT_SECRET,
  DATABASE_URL: value.DATABASE_URL,
  BASE_URL: value.BASE_URL,
};
