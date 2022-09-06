import { MyDataSource } from "../db/data-source";

import { Repository } from "typeorm";
import { UserEntity } from "../db/entity/user.entity";

export interface UserRepository extends Repository<UserEntity> {}

export class UserRepositoryModel {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = MyDataSource.getRepository("user");
  }

  public findOneByEmail = async (email) => {
    const foundUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return foundUser;
  };

  public create = async (user) => {
    const newUser = await this.userRepository.save(user);
    return newUser;
  };

  public findOneByUUID = async (uuid) => {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: uuid,
      },
    });
    return foundUser;
  };

  public deleteUser = async (uuid) => {
    const deletedUser = await this.userRepository.delete(uuid);
    return deletedUser;
  };

  public findOneByUUIDWithProfile = async (uuid) => {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        profile: true,
      },
    });
    return foundUser;
  };

  public findOneByUUIDWithPhoto = async (uuid) => {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        photos: true,
      },
    });
    return foundUser;
  };
}
