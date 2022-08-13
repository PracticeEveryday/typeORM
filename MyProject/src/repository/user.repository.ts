import { MyDataSource } from "../db/data-source";

import { Repository } from "typeorm";
import { UserEntity } from "../db/entity/user.entity";

export interface UserRepository extends Repository<UserEntity> {}
