"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const index_1 = __importDefault(require("../config/index"));
exports.MyDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: index_1.default.DB_HOST,
    port: 5432,
    username: index_1.default.DB_USERNAME,
    password: index_1.default.DB_PASSWD,
    database: index_1.default.DB_DBNAME,
    synchronize: true,
    logging: false,
    entities: [user_entity_1.UserEntity],
});
//# sourceMappingURL=data-source.js.map