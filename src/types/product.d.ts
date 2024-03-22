import { IUser } from "./auth";
import { IStore } from "./store";

export interface IProduct {
    price: number
    description?: string,
    imgUrl?: string,
    store: IStore
  }