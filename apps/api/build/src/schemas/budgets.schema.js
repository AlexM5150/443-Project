"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    _user: { type: String, required: true },
    _current: { type: Number, default: 0 },
    _budget: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                if (value <= 0)
                    throw new Error(`Budget value ${value} must be higher than 1`);
            },
            message: (props) => props.reason.message,
        },
    },
    _title: { type: String, required: true, unique: true },
    expenses: [
        {
            category: { type: String, required: true },
            current: { type: Number, default: 0 },
            budget: {
                type: Number,
                required: true,
                validate: {
                    validator: function (value) {
                        if (value <= 0)
                            throw new Error(`Category budget ${value} must be higher than 1`);
                    },
                    message: (props) => props.reason.message,
                },
            },
            expenses: [
                {
                    title: { type: String, required: true },
                    cost: {
                        type: Number,
                        required: true,
                        validate: {
                            validator: function (value) {
                                if (value <= 0)
                                    throw new Error(`Category expense ${value} must be higher than 1`);
                            },
                            message: (props) => props.reason.message,
                        },
                    },
                    created: { type: String },
                },
            ],
        },
    ],
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("budgets", schema);
//# sourceMappingURL=budgets.schema.js.map