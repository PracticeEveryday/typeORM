"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const indexRouter_1 = require("./routers/indexRouter");
const registerRouter_1 = require("./routers/registerRouter");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/", indexRouter_1.indexRouter);
router.use("/register", registerRouter_1.registerRouter);
//# sourceMappingURL=index.js.map