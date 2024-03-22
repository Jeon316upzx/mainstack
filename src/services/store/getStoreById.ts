import { store as storeModel } from "../../models/store";


export const getStoreById = async (storeId: string): Promise<any> => {
  const store = await storeModel.findById({
    _id: storeId
  });
  return store;
};
