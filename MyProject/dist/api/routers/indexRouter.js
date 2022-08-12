"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = require("express");
const indexRouter = (0, express_1.Router)();
exports.indexRouter = indexRouter;
indexRouter.get("/", (req, res) => {
    res.status(200).json({ status: "succ" });
});
//# sourceMappingURL=indexRouter.js.map