import { Router, Request, Response, NextFunction } from "express";

import { HttpException } from "../../exceptions/httpException";

import { RegisterService } from "../../services/registerService";

const registerRouter = Router();

const registerService = new RegisterService();

registerRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.body.email || undefined;
      const password = req.body.password || undefined;
      const name = req.body.name || undefined;

      const user = await registerService.create(email, password, name);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export { registerRouter };
