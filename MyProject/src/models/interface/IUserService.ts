import { DeleteResult } from "typeorm";
import { HttpException } from "../../setting/exception/httpException";

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  create_dt: Date;
  update_dt: Date;
  profile?: string;
  photos?: string;
}

export interface IUserService {
  register(user: IUser): Promise<IUser>;
  login(email: string, password: string): Promise<{ token: string }>;
  deleteUser(userId: string): Promise<DeleteResult>;
  passwordInitialization(userId: string): Promise<IUser>;
}
