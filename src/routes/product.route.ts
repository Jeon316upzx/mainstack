import { Router } from "express";
import {
  getProductByIdController,
  deleteProductController,
  createProductController,
  updateProductController,
  getStoreProductsController,
} from "../controllers/product/product.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
const productRouter = Router();

productRouter.post(
  "/createProduct/:storeId",
  isAuthenticated,
  createProductController
);
productRouter.get(
  "/:productId",
  isAuthenticated,
  getProductByIdController
);
productRouter.delete(
  "/:productId",
  isAuthenticated,
  deleteProductController
);
productRouter.put(
  "/:productId",
  isAuthenticated,
  updateProductController
);

productRouter.get(
  "/store/:storeId",
  isAuthenticated,
  getStoreProductsController
);
export default productRouter;
