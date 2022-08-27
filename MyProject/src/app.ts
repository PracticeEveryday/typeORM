import express from "express";

import { UserController } from "./controller/user.controller";
import { ProfileController } from "./controller/profile.controller";
import { PhotoController } from "./controller/photo.controller";

import morgan from "morgan";
import cors from "cors";
import { errorMiddleware } from "./setting/middlewares/errorMiddleware";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import config from "./config";

import { Container } from "typedi";
import { dependencies } from "./types/typedi/dependencies";
import { UserService } from "./service/user.service";
import { logger } from "./setting/log/winston";

class App {
  public app: express.Application;
  private userController: UserController;
  private profileController: ProfileController;
  private photoController: PhotoController;
  private swaggerSpec;

  constructor() {
    const app: express.Application = express();
    // 의존성 Container set
    dependencies();

    this.app = app;
    this.swaggerSpec = YAML.load(path.join(__dirname, "../swagger.yaml"));
    this.userController = new UserController(Container.get(UserService));
    this.profileController = new ProfileController();
    this.photoController = new PhotoController();
  }

  private setRouter() {
    this.app.use("/api/users", this.userController.router);
    this.app.use("/api/profiles", this.profileController.router);
    this.app.use("/api/photos", this.photoController.router);
  }

  private setMiddleware() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    this.app.get("/", (req, res) => {
      res.status(200).send("Hello");
    });

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
    logger.info(process.env.NODE_ENV);
    this.app.listen(config.PORT, () => {
      logger.info(
        `TypeORM API Dev Server is running on: http://localhost:${port}`
      );
      if (config.nodeEnv === "production") {
        console.log(
          `TypeORM API production Server is running on: http://localhost:${port}`
        );
      }
    });
  }
}

export { App };
