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
const jsonwebtoken_1 = require("jsonwebtoken");
const schemas_1 = require("../../schemas");
const tools_1 = require("../../tools");
class AuthController {
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                tools_1.ApiError.check("body", { email, password });
                const user = yield schemas_1.accountsSchema.create({
                    email,
                    password,
                    username: email,
                });
                res.cookie("jwt", (0, jsonwebtoken_1.sign)({ userId: user._id }, tools_1.env.JWT_KEY));
                res.json({ code: 200, message: `New user ${user._id}` });
            }
            catch (e) {
                if (e.code === 11000)
                    next(new tools_1.ApiError(409, "User already exists"));
                else
                    next(e);
            }
        });
    }
    static signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                tools_1.ApiError.check("body", { email, password });
                const user = yield schemas_1.accountsSchema.findOne({ email }); // Account.encrypt(email)
                if (!user)
                    throw new tools_1.ApiError(404, "User not found");
                // if (!Account.verify(password, user.password)) throw new ApiError(403, "Invalid password");
                res.cookie("jwt", (0, jsonwebtoken_1.sign)({ userId: user._id }, tools_1.env.JWT_KEY));
                res.json({ code: 200, message: `Logged-in user ${user._id}` });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map