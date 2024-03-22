import { product as productModel } from "../../models/product";

export const getStoreProducts = async (storeId: string): Promise<any> => {
  const products = await productModel.find({
    store: storeId,
  });
  return products;
};
