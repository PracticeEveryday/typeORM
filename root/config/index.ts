import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env 파일이 없습니다!!");
}

export default {
  // 백엔드 포트번호
  PORT: process.env.SERVER_PORT || 5000,

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PASSWD: process.env.DB_PASSWD,
  DB_USERNAME: process.env.DB_USERNAME || "root",
  DB_DBNAME: process.env.DB_DBNAME || "test",
};
