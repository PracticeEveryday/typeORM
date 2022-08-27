import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env 파일이 없습니다!!");
}

export default {
  nodeEnv: process.env.NODE_ENV,

  // 백엔드 포트번호
  PORT: process.env.SERVER_PORT || 5000,

  JWT_KEY: process.env.JWT_KEY,

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PASSWD: process.env.DB_PASSWD,
  DB_USERNAME: process.env.DB_USERNAME || "root",
  DB_DBNAME: process.env.DB_DBNAME || "test",
  DB_URL: process.env.DB_URL,
};
