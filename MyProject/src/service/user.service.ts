import { UserEntity } from "../db/entity/user.entity";
import { UserRepository } from "../repository/user.repository";

import { HttpException } from "../setting/exception/httpException";
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

  public login = async (email: string, password: string) => {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      // 가입 이메일 없음.
      const error = new HttpException(
        404,
        "해당 이메일로 가입한 유저가 없습니다."
      );
      throw error;
    }
    return user;
  };
}
