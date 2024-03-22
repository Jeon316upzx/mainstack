import Joi from "joi";

export const schema = Joi.object({
  SERVER_PORT: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  BASE_URL: Joi.string().required(),
});
