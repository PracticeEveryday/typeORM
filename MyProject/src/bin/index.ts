import { App } from "../app";

import { MyDataSource } from "../db/data-source";

import { DataSource } from "typeorm";

import config from "../config";

class Server {
  private myDataSource: DataSource;
  private app: App;

  constructor() {
    this.myDataSource = MyDataSource;
    this.app = new App();
  }

  public init() {
    this.myDataSource
      .initialize()
      .then(async () => {
        console.log("prostgreSQL DB connection success");

        this.app.listen(config.PORT);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const server: Server = new Server();
server.init();
