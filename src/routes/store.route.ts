import { Router } from "express";
import {
  getStoreById,
  createStoreController,
  getStores
} from "../controllers/store/store.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
const storeRouter = Router();

storeRouter.post("/createStore", isAuthenticated, createStoreController);
storeRouter.get("/getStore/:storeId", isAuthenticated, getStoreById);
storeRouter.get("/getStores", isAuthenticated, getStores);
export default storeRouter;
