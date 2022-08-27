import { UserEntity } from "../db/entity/user.entity";
import { UserRepository } from "../repository/user.repository";

import { IUserService } from "../types";

import { makeToken } from "../utils/jwtUtil";

import { HttpException } from "../setting/exception/httpException";
import { MyDataSource } from "../db/data-source";

import { DeleteResult } from "typeorm";

import { Service } from "typedi";

@Service()
export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = MyDataSource.getRepository("user");
  }

  // 회원가입
  public register = async (user) => {
    if (user.email === undefined) {
      throw new HttpException(400, "이메일을 입력하세요");
    }
    // undefined면 제일 위에 아이를 가져옴...
    // validator로 체크했는데 어떻게 해야 할까?
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
  public login = async (email, password) => {
    if (email === undefined) {
      throw new HttpException(400, "이메일을 입력하세요");
    }

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
  public passwordInitialization = async (userId) => {
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

  // 프로필과 유저 동시 반환 => left Join
  public getWithProfile = async (userId) => {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        profile: true,
      },
    });

    const foundUser2 = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile")
      .getOne();

    return foundUser;
  };

  // 포토와 유저 동시 반환 => left Join
  public getWithPhoto = async (userId) => {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        photos: true,
      },
    });

    const foundUser2 = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.photos", "photo")
      .getOne();

    return foundUser;
  };
}
