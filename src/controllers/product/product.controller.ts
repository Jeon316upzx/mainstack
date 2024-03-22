import { Request, Response } from "express";
import { IProduct } from "../../types/product";
import { validateProductData } from "../../validators/product.validator";
import {
  errorResponseHandler,
  successResponseHandler,
} from "../../utils/response";
import { createProduct } from "../../services/product/createProduct";
import { getStoreProducts } from "../../services/product/getStoreProducts";
import { deleteProductById } from "../../services/product/deleteProduct";
import { updateProductById } from "../../services/product/updateProduct";

import { getProductById } from "../../services/product/getProductById";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { price, description, imgUrl } = req.body;
    const storeId = req.params.storeId;
    const isValidData = validateProductData({
      price,
      description,
      imgUrl,
    });

    if (!isValidData) {
      return errorResponseHandler(res, 400, new Error("Validation Error"));
    }

    const newProduct = await createProduct(
      { price, description, imgUrl },
      storeId
    );

    if (!newProduct)
      return errorResponseHandler(
        res,
        400,
        new Error("New Product creation was not successful")
      );
    return successResponseHandler(res, 201, newProduct);
  } catch (e: any) {
    return errorResponseHandler(res, 500, new Error("Something happened"));
  }
};

export const getStoreProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const storeId = req.params.storeId;
    const products = await getStoreProducts(storeId);
    return successResponseHandler(res, 200, products);
  } catch (e: any) {
    return errorResponseHandler(res, 500, new Error("Something happened"));
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const isDeleted = await deleteProductById(productId);
    if (!isDeleted)
      return errorResponseHandler(res, 400, new Error("Deletion unsuccessful"));
    return successResponseHandler(res, 204);
  } catch (e: any) {
    return errorResponseHandler(res, 500, new Error("Something happened"));
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { price, description, imgUrl } = req.body;
    const productId = req.params.productId;
    const isValidData = validateProductData({
      price,
      description,
      imgUrl,
    });

    if (!isValidData) {
      return errorResponseHandler(res, 400, new Error("Validation Error"));
    }
    const updatedProduct = await updateProductById(productId, {
      price,
      description,
      imgUrl,
    });

    if (!updatedProduct)
      return errorResponseHandler(
        res,
        400,
        new Error("Updation was not successful")
      );
    return successResponseHandler(res, 200);
  } catch (e: any) {
    return errorResponseHandler(res, 500, new Error("Something happened"));
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    if (!product)
      return errorResponseHandler(
        res,
        400,
        new Error("Product does not exists")
      );
    return successResponseHandler(res, 200, product);
  } catch (e: any) {
    return errorResponseHandler(res, 500, new Error("Something happened"));
  }
};
