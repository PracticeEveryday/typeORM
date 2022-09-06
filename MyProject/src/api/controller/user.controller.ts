import { Router, Request, Response, NextFunction } from "express";
import { UserEntity } from "../../db/entity/user.entity";
import { UserService } from "../../service/user.service";

import { userValidate, userValidateOptional } from "./validator/user.validator";

import { checkLogin } from "../middlewares/checkLogin";
export class UserController {
  public router: Router;
  private userService: UserService;

  constructor(userService) {
    this.userService = userService;
    this.router = Router();
    this.routes();
  }

  // 회원가입
  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.body as UserEntity;
      const newUser = await this.userService.register(user);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // 로그인
  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await this.userService.login(email, password);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  // 회원 탈퇴
  private deleteUser = async (
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

  // 회원 비밀번호 초기화
  private passwordInitialization = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const initializedUser = await this.userService.passwordInitialization(
        userId
      );

      res.status(200).json(initializedUser);
    } catch (error) {
      next(error);
    }
  };

  private getWithProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const userWithProfile = await this.userService.getWithProfile(userId);
      res.status(200).json(userWithProfile);
    } catch (error) {
      next(error);
    }
  };

  private getWithPhoto = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const userWithPhoto = await this.userService.getWithPhoto(userId);
      res.status(200).json(userWithPhoto);
    } catch (error) {
      next(error);
    }
  };

  private routes() {
    this.router.post("/register", userValidate, this.register);
    this.router.post("/login", this.login);
    this.router.delete("/withdrawal", checkLogin, this.deleteUser);
    this.router.put(
      "/passwordInitialization",
      checkLogin,
      this.passwordInitialization
    );
    this.router.post("/getWithProfile", checkLogin, this.getWithProfile);
    this.router.post("/getWithPhoto", checkLogin, this.getWithPhoto);
  }
}
