import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

import dotenv from "../config/index";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dotenv.DB_HOST,
  port: 5432,
  username: dotenv.DB_USERNAME,
  password: dotenv.DB_PASSWD,
  database: dotenv.DB_DBNAME,
  synchronize: true,
  logging: false,
  entities: [User],
});
