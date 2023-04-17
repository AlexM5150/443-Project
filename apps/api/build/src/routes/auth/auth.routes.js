"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/sign-in", auth_controller_1.default.signIn);
authRoutes.post("/sign-up", auth_controller_1.default.signUp);
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map