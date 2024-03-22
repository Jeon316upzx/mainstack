import { store as storeModel } from "../../models/store";
import { IStore } from "../../types/store";

export const createStore = async (
  store: Omit<IStore, "user">, id: string
): Promise<any> => {
  const newStore = new storeModel({
    ...store,
    user: id
  });
  return await newStore.save();
};
