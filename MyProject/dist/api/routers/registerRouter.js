"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const registerService_1 = require("../../service/registerService");
const registerRouter = (0, express_1.Router)();
exports.registerRouter = registerRouter;
const registerService = new registerService_1.RegisterService();
registerRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email || undefined;
        const password = req.body.password || undefined;
        const name = req.body.name || undefined;
        const user = yield registerService.create(email, password, name);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=registerRouter.js.map