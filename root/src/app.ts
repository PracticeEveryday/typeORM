import express from "express";

import { router } from "./api";
const app = express();

app.use(router);

export { app };
