import express from "express";

import { UserController } from "./controller/user.controller";

import morgan from "morgan";
import { errorMiddleware } from "./setting/middlewares/errorMiddleware";

import dotenv from "./config";

class Server {
  public app: express.Application;
  private userController: UserController;
  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRouter() {
    this.userController = new UserController();
    this.app.use("/api/users", this.userController.router);
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
