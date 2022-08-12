import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class UserModel {
  public async create(email: string, password: string, name: string) {
    const user = await AppDataSource.getRepository(User).create({
      email,
      password,
      name,
    });
    const results = await AppDataSource.getRepository(User).save(user);
    return results;
  }
}
