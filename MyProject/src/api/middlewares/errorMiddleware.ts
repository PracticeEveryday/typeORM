import { Request, Response, NextFunction } from "express";
import { HttpException } from "../../setting/exception/httpException";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("\x1b[33m%s\x1b[0m", error);
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  console.log("message", message);
  res.status(status).json({
    status,
    message,
  });
};

export { errorMiddleware };
