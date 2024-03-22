import { product as productModel } from "../../models/product";
import { IProduct } from "../../types/product";

export const createProduct = async (
  product: Omit<IProduct, "store">,
  storeId: string
): Promise<any> => {
  const newProduct = new productModel({
    ...product,
    store: storeId,
  });
  

  return await newProduct.save();
};
