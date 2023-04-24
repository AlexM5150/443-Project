"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: { type: String, unique: true },
    password: String,
    budget: { type: Number, default: 0 },
    username: { type: String, unique: true },
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("accounts", schema);
//# sourceMappingURL=accounts.schema.js.map