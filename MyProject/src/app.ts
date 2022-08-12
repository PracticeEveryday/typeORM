import express from "express";

import { router } from "./api";
import morgan from "morgan";
import { errorMiddleware } from "./api/middlewares/errorMiddleware";

import dotenv from "./config";

class Server {
  public app: express.Application;
  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRouter() {
    this.app.use(router);
  }

  private setMiddleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    this.setRouter();
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(dotenv.PORT, () => console.log(`${dotenv.PORT} port on`));
  }
}

export { Server };
