"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error(".env 파일이 없습니다!!");
}
exports.default = {
    // 백엔드 포트번호
    PORT: process.env.SERVER_PORT || 5000,
};
//# sourceMappingURL=index.js.map