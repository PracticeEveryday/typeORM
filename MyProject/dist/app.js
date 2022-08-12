"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = require("./api/middlewares/errorMiddleware");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(api_1.router);
app.use(errorMiddleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map