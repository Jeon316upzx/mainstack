import { store as storeModel } from "../../models/store";

export const getAllUserStores = async (userId: string): Promise<any> => {
  const stores = await storeModel.find({
    user: userId,
  });
  return stores;
};
