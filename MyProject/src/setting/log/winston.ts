import winston from "winston";
import config from "../../config";

import winstonDaily from "winston-daily-rotate-file";

import "moment-timezone";

const { combine, timestamp, label, printf, cli, splat, errors, colorize } =
  winston.format;

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;

//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

const logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat // log 출력 포맷
    //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
  ),
  transports: [
    //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
    new winstonDaily({
      level: "info", // info 레벨에선
      datePattern: "YYYY-MM-DD", // 파일 날짜 형식
      dirname: logDir, // 파일 경로
      filename: `%DATE%.log`, // 파일 이름
      maxFiles: 30, // 최근 30일치 로그 파일을 남김
      zippedArchive: true, // 아카이브된 로그 파일을 gzip으로 압축할지 여부
    }),
    //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
    new winstonDaily({
      level: "error", // error 레벨에선
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", // /logs/error 하위에 저장
      filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.exception.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

switch (config.nodeEnv) {
  case "development": {
    logger.add(
      new winston.transports.Console({
        level: "silly",
        //* 로그 출력 형식 정의
        format: combine(
          label({ label: "development" }), // 어플리케이션 이름
          logFormat
        ),
      })
    );

    break;
  }
  case "production": {
    logger.add(
      new winston.transports.Console({
        level: "info",
        //* 로그 출력 형식 정의
        format: combine(
          label({ label: "production" }), // 어플리케이션 이름
          logFormat
        ),
      })
    );
    break;
  }
  case "test": {
    logger.add(
      new winston.transports.Console({
        level: "info",
        format: combine(
          label({ label: "test" }), // 어플리케이션 이름
          logFormat
        ),
      })
    );

    break;
  }
}

const format = () => {
  const result = process.env.NODE_ENV === "production" ? "combined" : "dev";
  return result;
};

// 로그 작성을 위한 Output stream옵션.
const stream = {
  write: (message) => {
    // console.log(message);
    logger.info(message);
  },
};

// 로깅 스킵 여부 (만일 배포환경이면, 코드가 400 미만라면 함수를 리턴해 버려서 로그 기록 안함. 코드가 400 이상이면 로그 기록함)
const skip = (_, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.ststusCode < 400;
  }
  return false;
};

export { logger, format, skip, stream };
