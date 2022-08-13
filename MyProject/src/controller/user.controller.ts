import { Router, Request, Response, NextFunction } from "express";
import { UserEntity } from "../db/entity/user.entity";
import { UserService } from "../service/user.service";
import { HttpException } from "../setting/exception/httpException";
export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as UserEntity;
      const newUser = await this.userService.create(user);
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  public routes() {
    this.router.post("/", this.create);
    this.router.post("/login", this.login);
  }
}
