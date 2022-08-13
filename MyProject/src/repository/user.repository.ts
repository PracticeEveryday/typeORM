import { MyDataSource } from "../db/data-source";

import { Repository } from "typeorm";
import { UserEntity } from "../db/entity/user.entity";

export class UserRepository extends Repository<UserEntity> {}
