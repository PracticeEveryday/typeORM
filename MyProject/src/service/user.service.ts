import { UserEntity } from "../db/entity/user.entity";
import { UserRepository } from "../repository/user.repository";

import { makeToken } from "../utils/jwtUtil";

import { HttpException } from "../setting/exception/httpException";
import { MyDataSource } from "../db/data-source";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = MyDataSource.getRepository("user");
  }

  public register = async (user: UserEntity): Promise<UserEntity> => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  };

  public login = async (
    email: string,
    password: string
  ): Promise<{ token: string } | UserEntity> => {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      // 가입 이메일 없음.
      throw new HttpException(404, "해당 이메일로 가입한 유저가 없습니다.");
    } else if (user.password === password) {
      // 로그인
      const token = makeToken({ userId: user.id });
      return { token };
    } else {
      // 비밀번호 다름
      throw new HttpException(400, "비밀번호가 틀립니다.");
    }
  };

  public deleteUser = async (userId: string) => {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      // 가입 이메일 없음.
      throw new HttpException(404, "해당 이메일로 가입한 유저가 없습니다.");
    } else {
      const deletedUser = await this.userRepository.delete(userId);
      return deletedUser;
    }
  };
}
