import app from "./app";
import { createServer } from "http";
import { config } from "./validators/env.validator";
import { database } from "./configs/database.config";

/**
 * Connect to the mongoDB database, 
 * create and start the server using 
 * the express app instance
 *
 */

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log(`Database connected successfully`);
})

const { PORT : SERVER_PORT } = config;
const server = createServer(app);

const PORT = SERVER_PORT || process.env.PORT


server.listen(PORT , () =>
  console.log(`Server listening at port ${PORT}`)
);
