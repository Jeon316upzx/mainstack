import { Router } from "express";
import { register, login } from "../controllers/auth/auth.controller";


const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

export default authRouter;