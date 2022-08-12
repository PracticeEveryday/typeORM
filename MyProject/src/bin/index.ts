import { Server } from "../app";
import { AppDataSource } from "../db/data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("prostgre DB connection success");

    const server = new Server();
    server.listen();
  })
  .catch((error) => {
    console.log(error);
  });
