import { Router, Request, Response, NextFunction } from "express";
import { ProfileEntity } from "../db/entity/profile.entity";
import { ProfileService } from "../service/profile.service";

import { checkLogin } from "../setting/middlewares/checkLogin";
export class ProfileController {
  public router: Router;
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
    this.router = Router();
    this.routes();
  }

  private routes() {}
}
