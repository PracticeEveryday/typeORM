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
  signUp(user: IUser): Promise<IUser>;
  login(email: string, password: string): Promise<{ token: string }>;
  deleteUser(userId: string): Promise<DeleteResult>;
  passwordInitialization(userId: string): Promise<IUser>;
}

export interface IUserRepositoryModel {
  findOneByEmail(email: string): Promise<IUser | null>;
  create(user: Partial<IUser>): Promise<IUser>;
  findOneByUUID(uuid: string): Promise<IUser | null>;
  deleteUser(uuid: string): Promise<DeleteResult>;
  findOneByUUIDWithProfile(uuid: string): Promise<IUser | null>;
  findOneByUUIDWithPhoto(uuid: string): Promise<IUser | null>;
}
