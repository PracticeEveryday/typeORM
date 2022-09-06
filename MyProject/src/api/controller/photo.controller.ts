import { Router, Request, Response, NextFunction } from "express";
import { PhotoEntity } from "../../db/entity/photo.entity";
import { PhotoService } from "../../service/photo.service";

import { checkLogin } from "../middlewares/checkLogin";
export class PhotoController {
  public router: Router;
  private photoService: PhotoService;

  constructor(photoService) {
    this.photoService = photoService;
    this.router = Router();
    this.routes();
  }

  private createPhoto = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const url = req.body;
      const user_id = req.user;
      const newPhoto = await this.photoService.createPhoto(user_id, url);
      res.status(201).json(newPhoto);
    } catch (error) {
      next(error);
    }
  };

  private routes() {
    this.router.post("/photo", checkLogin, this.createPhoto);
  }
}
