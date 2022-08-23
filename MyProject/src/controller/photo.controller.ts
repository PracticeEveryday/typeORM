import { Router, Request, Response, NextFunction } from "express";
import { PhotoEntity } from "../db/entity/photo.entity";
import { PhotoService } from "../service/photo.service";

import { checkLogin } from "../setting/middlewares/checkLogin";
export class PhotoController {
  public router: Router;
  private photoService: PhotoService;

  constructor() {
    this.photoService = new PhotoService();
    this.router = Router();
    this.routes();
  }

  private routes() {}
}
