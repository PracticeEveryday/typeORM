import { ValidationError } from "express-validator";

class ExpressVlidatorException {
  status: number;
  message: { errors: ValidationError[] };
  constructor(status: number, message: { errors: ValidationError[] }) {
    this.status = status;
    this.message = message;
  }
}

export { ExpressVlidatorException };
