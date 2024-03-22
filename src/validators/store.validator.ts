import { IStore } from "../types/store";
import { storeSchema } from "./storeSchema/store.schema";

export const validateStoreData = (
  store: Omit<IStore, "user">
): boolean | Error => {
  const { value, error } = storeSchema.validate(store);
  if (error) return new Error(`Validation error: ${error.message}`);
  return true;
};
