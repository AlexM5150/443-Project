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
const tools_1 = require("../tools");
const schemas_1 = require("../schemas");
class Verify {
    static authToken(authorization) {
        if (!authorization)
            throw new tools_1.ApiError(403, "Authorization header not found");
        const token = authorization.split(" ")[1];
        if (token === undefined)
            throw new tools_1.ApiError(403, "User token not connected");
        const result = (0, jsonwebtoken_1.verify)(token, tools_1.env.JWT_KEY);
        return result.userId;
    }
    static user(req, _res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            try {
                const userId = Verify.authToken(authorization);
                const result = yield schemas_1.accountsSchema.findOne({ _id: userId }, "budget");
                if (!result)
                    throw new tools_1.ApiError(404, `User ${userId} not found`);
                req.user = result;
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = Verify;
//# sourceMappingURL=verify.js.map