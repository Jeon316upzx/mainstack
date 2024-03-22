import { IUser } from "../types/auth";
import { loginSchema } from "./userSchema/user.schema";

export const validateUserLoginData = (email: string, password:string): boolean | Error => {
  const { value, error } = loginSchema.validate({ email, password });
  if (error) return new Error(`Validation error: ${error.message}`);
  return true;
};
