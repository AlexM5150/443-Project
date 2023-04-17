"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user/user.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const middleware_1 = require("../middleware");
const routes = (0, express_1.Router)();
routes.use("/user", middleware_1.Verify.user, user_routes_1.default);
routes.use("/auth", (0, express_1.json)(), auth_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map