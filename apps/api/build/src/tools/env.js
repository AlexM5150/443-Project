"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    // SERVER ENV
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080",
    DOMAIN: (_b = process.env.DOMAIN) !== null && _b !== void 0 ? _b : "",
    WEB_URL: (_c = process.env.WEB_URL) !== null && _c !== void 0 ? _c : process.env.DOMAIN,
    // MONGODB ENV
    DB_URL: (_d = process.env.DB_URL) !== null && _d !== void 0 ? _d : "",
    DB_NAME: (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : "",
    DB_USER: (_f = process.env.DB_USER) !== null && _f !== void 0 ? _f : "",
    DB_PASSWORD: (_g = process.env.DB_PASSWORD) !== null && _g !== void 0 ? _g : "",
    // KEYS ENV
    JWT_KEY: (_h = process.env.JWT_KEY) !== null && _h !== void 0 ? _h : "",
    ENCRYPTION_KEY: (_j = process.env.ENCRYPTION_KEY) !== null && _j !== void 0 ? _j : "",
    IV_KEY: (_k = process.env.IV_KEY) !== null && _k !== void 0 ? _k : "",
};
//# sourceMappingURL=env.js.map