import { UserEntity } from "../db/entity/user.entity";
import { UserRepository } from "../repository/user.repository";

import { MyDataSource } from "../db/data-source";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = MyDataSource.getRepository("user");
  }

  public create = async (user: UserEntity) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  };
}
