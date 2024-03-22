import { Request, Response } from "express";
import { validateStoreData } from "../../validators/store.validator";
import { errorResponseHandler } from "../../utils/response";
import { createStore } from "../../services/store/createStore";
import { successResponseHandler } from "../../utils/response";
import { getStoreById as getStore } from "../../services/store/getStoreById";
import { getAllUserStores } from "../../services/store/getStores";

export const createStoreController = async (req: Request, res: Response) => {
  try {
    const { name, description, location } = req.body;
    const isValidData = validateStoreData({
      name,
      description,
      location,
    });

    if (!isValidData) {
      return errorResponseHandler(res, 400, new Error("Validation Error"));
    }

    const userId = req.body.user;

    const newStore = await createStore(
      {
        name,
        description,
        location,
      },
      userId
    );

    if (!newStore)
      return errorResponseHandler(
        res,
        400,
        new Error("Store creation was not successful")
      );
    return successResponseHandler(res, 201, newStore);
  } catch (e: any) {
    return errorResponseHandler(res, 500, new Error("Something happened"));
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  const storeId = req.params.storeId;
  const store = await getStore(storeId);
  if (!store)
    return errorResponseHandler(res, 404, new Error("Store not found"));
  return successResponseHandler(res, 200, store);
};

export const getStores = async (req: Request, res: Response) => {
  const userId = req.body.user;
  const stores = await getAllUserStores(userId);
  return successResponseHandler(res, 200, stores);
};
