import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class UserModel {
  public async create(email: string, password: string, name: string) {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    await AppDataSource.manager.save(user);
    return user;
  }
}
