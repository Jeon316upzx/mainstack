import { IProduct } from "../types/product";
import { productSchema } from "./productSchema/product.schema";

export const validateProductData = (product: Omit<IProduct,"store">): boolean | Error => {
  const { value, error } = productSchema.validate(product);
  if (error) return new Error(`Validation error: ${error.message}`);
  return true;
};
