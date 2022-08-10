import express from "express";
import { AppDataSource } from "./db/data-source";
const app = express();

AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log("3000번 포트 온");
    });
  })
  .catch((error) => {
    console.log(error);
  });
