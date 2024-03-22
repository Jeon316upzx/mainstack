import Joi from "joi";

export const productSchema = Joi.object({
  price: Joi.string().required(),
  description: Joi.string(),
  imgUrl: Joi.string(),
});
