import jwt from "jsonwebtoken";

import config from "../config";

const makeToken = (object) => {
  const token = jwt.sign(object, config.JWT_KEY as string, {
    expiresIn: "24h",
  });
  return token;
};

export { makeToken };
