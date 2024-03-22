import Joi from "joi";

export const storeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string(),
});
