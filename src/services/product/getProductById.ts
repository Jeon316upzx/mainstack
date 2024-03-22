import { product as productModel } from "../../models/product";


export const getProductById = async (productId: string): Promise<any> => {
  const product = await productModel.findById({
    _id: productId
  });
  return product;
};
