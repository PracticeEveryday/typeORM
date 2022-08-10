import { Router } from "express";

const registerRouter = Router();

registerRouter.post("/", (req, res, next) => {
  const email = req.body.email || undefined;
  const password = req.body.password || undefined;
  const name = req.body.name || undefined;
});

export { registerRouter };
