import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorResponseHandler } from "./utils/response";
import { config } from "./validators/env.validator";
import authRouter from "./routes/auth.route";
import storeRouter from "./routes/store.route";
import productRouter from "./routes/product.route";

/**
 *  Create an express application instance
 *
 *  using the express() function, using helmet
 *  secure the application instance from vulnerabilities
 *  and allow all requests through the application using cors
 *
 */
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const { BASE_URL } = config;



app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/store`, storeRouter);
app.use(`${BASE_URL}/product`, productRouter);


app.use("*", (req: Request, res: Response) => {
  return errorResponseHandler(
    res,
    404,
    new Error(`
         Route not found
     `)
  );
});

export default app;
