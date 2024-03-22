import { IUser } from "../types/auth";
import { registrationSchema } from "./userSchema/user.schema";

export const validateUserRegistrationData = (
  user: Omit<IUser, "_id">
): boolean | Error => {
  const { value, error } = registrationSchema.validate(user);
  if (error) return new Error(`Validation error: ${error.message}`);
  return true;
};
