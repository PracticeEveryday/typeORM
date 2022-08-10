import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "111111",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Photo],
  migrations: [],
  subscribers: [],
});
