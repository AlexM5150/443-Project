"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const crypto_1 = __importDefault(require("crypto"));
class Account {
    static encrypt(value) {
        const cipher = crypto_1.default.createCipheriv("aes-256-cbc", Account.encryptionKey, Account.ivKey);
        let encrypted = cipher.update(value, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    }
    static decrypt(encrypted) {
        const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", Account.encryptionKey, Account.ivKey);
        let decrypted = decipher.update(encrypted, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
    static verify(value, encrypted) {
        const decrypted = Account.decrypt(encrypted);
        return value === decrypted;
    }
}
exports.default = Account;
Account.encryptionKey = Buffer.from(env_1.default.ENCRYPTION_KEY, "hex");
Account.ivKey = Buffer.from(env_1.default.IV_KEY, "hex");
//# sourceMappingURL=Account.js.map