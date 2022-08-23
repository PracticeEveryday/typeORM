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

class App {
  public app: express.Application;
  private userController: UserController;
  private profileController: ProfileController;
  private photoController: PhotoController;
  private swaggerSpec;

  constructor() {
    const app: express.Application = express();
    this.app = app;
    this.swaggerSpec = YAML.load(path.join(__dirname, "../swagger.yaml"));
    this.userController = new UserController();
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
    this.app.listen(config.PORT, () => console.log(`${port} port on`));
  }
}

export { App };
