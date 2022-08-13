import { Server } from "../app";
import { MyDataSource } from "../db/data-source";

MyDataSource.initialize()
  .then(async () => {
    console.log("prostgre DB connection success");

    const server = new Server();
    server.listen();
  })
  .catch((error) => {
    console.log(error);
  });
