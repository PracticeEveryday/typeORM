import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { ProfileEntity } from "./entity/profile.entity";

import dotenv from "../config/index";

export const MyDataSource = new DataSource({
  type: "postgres",
  url: dotenv.DB_URL,
  synchronize: true,
  logging: false,
  entities: [UserEntity, ProfileEntity],
});
