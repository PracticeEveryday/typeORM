import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "typeormtest",
  password: "111111",
  database: "typeormtest",
  synchronize: true,
  logging: false,
  entities: [User],
});
