import { UserEntity } from "../db/entity/user.entity";
import { UserRepository } from "../repository/user.repository";

import { makeToken } from "../utils/jwtUtil";

import { HttpException } from "../setting/exception/httpException";
import { MyDataSource } from "../db/data-source";

import { DeleteResult } from "typeorm";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = MyDataSource.getRepository("user");
  }

  public register = async (user: UserEntity): Promise<UserEntity> => {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (foundUser) {
      throw new HttpException(400, "이미 가입된 이메일입니다.");
    } else {
      const newUser = await this.userRepository.save(user);
      return newUser;
    }
  };

  public login = async (
    email: string,
    password: string
  ): Promise<{ token: string } | UserEntity> => {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!foundUser) {
      // 가입 이메일 없음.
      throw new HttpException(404, "해당 이메일로 가입한 유저가 없습니다.");
    } else if (foundUser.password === password) {
      // 로그인
      const token = makeToken({ userId: foundUser.id });
      return { token };
    } else {
      // 비밀번호 다름
      throw new HttpException(400, "비밀번호가 틀립니다.");
    }
  };

  public deleteUser = async (userId: string): Promise<DeleteResult> => {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      // 가입 이메일 없음.
      throw new HttpException(404, "해당 이메일로 가입한 유저가 없습니다.");
    } else {
      const deletedUser = await this.userRepository.delete(userId);
      return deletedUser;
    }
  };
}
