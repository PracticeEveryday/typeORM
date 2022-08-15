import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { ExpressVlidatorException } from "../../setting/exception/ExpressVlidatorException";

const validatorErrorChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ExpressVlidatorException(400, { errors: errors.array() });
  }
  next();
};

export { validatorErrorChecker };
