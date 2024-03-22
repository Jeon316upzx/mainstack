import { product as productModel } from "../../models/product";

export const deleteProductById = async (
  productId: string
): Promise<boolean> => {
  await productModel.deleteOne({
    _id: productId,
  });
  return true;
};
