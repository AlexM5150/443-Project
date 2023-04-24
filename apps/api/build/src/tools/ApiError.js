"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(code, error) {
        this.code = code;
        this.error = error;
    }
    static check(field, required) {
        const missingParams = [];
        for (const key in required)
            if (typeof required[key] === "undefined" || required[key] === "")
                missingParams.push(key);
        if (missingParams.length > 0) {
            const errorMessage = `Missing ${field} parameters: ${missingParams.join(", ")}`;
            throw new ApiError(400, errorMessage);
        }
    }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map