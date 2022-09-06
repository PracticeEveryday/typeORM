import { Router, Request, Response, NextFunction } from "express";
import { ProfileEntity } from "../../db/entity/profile.entity";
import { ProfileService } from "../../service/profile.service";

import { checkLogin } from "../middlewares/checkLogin";
export class ProfileController {
  public router: Router;
  private profileService: ProfileService;

  constructor(profileService) {
    this.profileService = profileService;
    this.router = Router();
    this.routes();
  }

  private createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { subject, description } = req.body;
      const user_id = req.user;
      const newProfile = await this.profileService.createProfile(
        user_id,
        subject,
        description
      );
      res.status(201).json(newProfile);
    } catch (error) {
      next(error);
    }
  };

  private routes() {
    this.router.post("/profile", checkLogin, this.createProfile);
  }
}
