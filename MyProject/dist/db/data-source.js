"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
const index_1 = __importDefault(require("../config/index"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: index_1.default.DB_HOST,
    port: 5432,
    username: index_1.default.DB_USERNAME,
    password: index_1.default.DB_PASSWD,
    database: index_1.default.DB_DBNAME,
    synchronize: true,
    logging: false,
    entities: [User_1.User],
});
//# sourceMappingURL=data-source.js.map