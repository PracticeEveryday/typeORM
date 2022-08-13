"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./controller/user.controller");
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = require("./setting/middlewares/errorMiddleware");
const config_1 = __importDefault(require("./config"));
class Server {
    constructor() {
        const app = (0, express_1.default)();
        this.app = app;
    }
    setRouter() {
        this.userController = new user_controller_1.UserController();
        this.app.use("/api/users", this.userController.router);
    }
    setMiddleware() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.setRouter();
        this.app.use(errorMiddleware_1.errorMiddleware);
    }
    listen() {
        this.setMiddleware();
        this.app.listen(config_1.default.PORT, () => console.log(`${config_1.default.PORT} port on`));
    }
}
exports.Server = Server;
//# sourceMappingURL=app.js.map