import express from "express";
import { AppDataSource } from "./db/data-source";
import dotenv from "./config/index";

const app = express();

AppDataSource.initialize()
  .then(async () => {
    console.log("connection success");
    app.listen(dotenv.PORT, () => {
      console.log(`${dotenv.PORT}번 포트 온`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
