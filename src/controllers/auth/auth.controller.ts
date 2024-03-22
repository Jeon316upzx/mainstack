import { Request, Response } from "express";
import { validateUserLoginData } from "../../validators/login.validator";
import { validateUserRegistrationData } from "../../validators/register.validator";
import {
  errorResponseHandler,
  successResponseHandler,
} from "../../utils/response";
import { createUser } from "../../services/user/createUser";
import { userExists } from "../../services/user/userExists";
import { compare } from "bcrypt";
import { generateUserToken } from "../../utils/auth/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isValidData = validateUserRegistrationData({
      firstName,
      lastName,
      email,
      password,
    });

    if (!isValidData) {
      return errorResponseHandler(res, 400, new Error("Validation Error"));
    }

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password,
    });

    if (!newUser)
      return errorResponseHandler(
        res,
        400,
        new Error("User creation was not successful")
      );
    return successResponseHandler(res, 201);
  } catch (e: any) {
    return errorResponseHandler(res, 500, new Error("Something happened"));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isValidData = validateUserLoginData(email, password);

    if (!isValidData) {
      return errorResponseHandler(res, 400, new Error("Validation Error"));
    }
    const user = await userExists(email);

    if (!user) {
      return errorResponseHandler(res, 400, new Error("Invalid User Details"));
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return errorResponseHandler(
        res,
        400,
        new Error("Incorrect User Password")
      );
    }

    const userToken = generateUserToken(user._id);

    return successResponseHandler(res, 200, { userToken });
  } catch (error: any) {
    return errorResponseHandler(res, 500, error.message);
  }
};
