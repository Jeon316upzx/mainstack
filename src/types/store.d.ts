import { IUser } from "./auth";

export interface IStore {
  name: string;
  description?: String;
  location?: String;
  user: IUser
}
