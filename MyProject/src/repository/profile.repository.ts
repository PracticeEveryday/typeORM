import { MyDataSource } from "../db/data-source";

import { Repository } from "typeorm";
import { ProfileEntity } from "../db/entity/profile.entity";

export interface ProfileRepository extends Repository<ProfileEntity> {}
