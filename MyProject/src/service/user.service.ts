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

  // 회원가입
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

  // 로그인
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

  // 회원 탈퇴
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

  // 비밀변호 초기화
  public passwordInitialization = async (userId: string) => {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new HttpException(404, "해당 이메일로 가입한 유저가 없습니다.");
    } else {
      // 문자 숫자 난수 조합 8자리
      foundUser.password = Math.random().toString(36).substr(2, 11);
      await this.userRepository.save(foundUser);
      return foundUser;
    }
  };
}
