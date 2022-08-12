"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    console.log("\x1b[33m%s\x1b[0m", error);
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    res.json({
        status,
        message,
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map