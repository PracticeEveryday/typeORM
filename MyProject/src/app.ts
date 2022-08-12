import express from "express";

import { router } from "./api";
import morgan from "morgan";
import { errorMiddleware } from "./api/middlewares/errorMiddleware";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.use(errorMiddleware);
export { app };
