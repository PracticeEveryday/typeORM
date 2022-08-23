import { ProfileEntity } from "../db/entity/profile.entity";
import { ProfileRepository } from "../repository/profile.repository";

import { HttpException } from "../setting/exception/httpException";
import { MyDataSource } from "../db/data-source";

export class ProfileService {
  private profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = MyDataSource.getRepository("profile");
  }
}
