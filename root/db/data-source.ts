import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";

import dotenv from "../config/index";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: dotenv.DB_HOST,
  port: 3306,
  username: dotenv.DB_USERNAME,
  password: dotenv.DB_PASSWD,
  database: dotenv.DB_DBNAME,
  synchronize: true,
  logging: false,
  entities: [Photo],
  migrations: [],
  subscribers: [],
});
