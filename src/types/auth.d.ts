import { Request } from "express";

export interface RequestWithUserId extends Request {
  user: IUser
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


