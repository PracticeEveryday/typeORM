import { Router, Request, Response, NextFunction } from "express";
import { UserEntity } from "../db/entity/user.entity";
import { UserService } from "../service/user.service";

import { checkLogin } from "../setting/middlewares/checkLogin";
export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  // 회원가입
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as UserEntity;
      const newUser = await this.userService.register(user);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // 로그인
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  // 회원 탈퇴
  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const deletedUser = await this.userService.deleteUser(userId);

      res.status(200).json({
        status: "succ",
        ...deletedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  public routes() {
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    this.router.delete("/withdrawal", checkLogin, this.deleteUser);
  }
}
