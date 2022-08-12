import express from "express";

import { router } from "./api";

import { errorMiddleware } from "./api/middlewares/errorMiddleware";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorMiddleware);
export { app };
