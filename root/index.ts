import { app } from "./src/app";
import { AppDataSource } from "./src/db/data-source";
import dotenv from "./src/config/index";

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
