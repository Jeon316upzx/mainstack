import { user as userModel } from "../../models/user";
import { IUser } from "../../types/auth";
import { hash } from "bcrypt";


export const createUser = async (user: Omit<IUser, "_id">): Promise<boolean> => {
  
  const hashedPassword = await hash(user.password, 10);
  const newUser = new userModel({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword,
  });
  await newUser.save();
  
  return true;
};
