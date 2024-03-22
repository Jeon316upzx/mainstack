import { user } from "../../models/user";
import { IUser } from "../../types/auth";

export const userExists = async (email: string): Promise<any> => {
  const userExists = await user.findOne({
     email: email
  })
  return userExists
};
