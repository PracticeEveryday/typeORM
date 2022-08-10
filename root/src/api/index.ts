import { Router } from "express";

import { indexRouter } from "./routers/indexRouter";
import { registerRouter } from "./routers/registerRouter";

const router = Router();

router.use("/", indexRouter);
router.use("/register", registerRouter);

export { router };
