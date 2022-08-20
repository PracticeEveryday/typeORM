import express from "express";

import { UserController } from "./controller/user.controller";

import morgan from "morgan";
import cors from "cors";
import { errorMiddleware } from "./setting/middlewares/errorMiddleware";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import config from "./config";

class App {
  public app: express.Application;
  private userController: UserController;
  private swaggerSpec;

  constructor() {
    const app: express.Application = express();
    this.app = app;
    this.swaggerSpec = YAML.load(path.join(__dirname, "../swagger.yaml"));
    this.userController = new UserController();
  }

  private setRouter() {
    this.app.use("/api/users", this.userController.router);
  }

  private setMiddleware() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    // swagger
    this.app.use(
      "/swagger",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerSpec)
    );

    this.setRouter();
    this.app.use(errorMiddleware);
  }

  public listen(port) {
    this.setMiddleware();
    this.app.listen(config.PORT, () => console.log(`${port} port on`));
  }
}

export { App };
