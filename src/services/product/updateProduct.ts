import { product as productModel } from "../../models/product";
import { IProduct } from "../../types/product";

export const updateProductById = async (
  productId: string,
  product: Omit<IProduct, "store">
): Promise<boolean> => {
  await productModel.findByIdAndUpdate(
    {
      _id: productId,
    },
    { ...product },
    { new: true }
  );
  return true;
};
