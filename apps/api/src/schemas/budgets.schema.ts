import { IBudgets } from "../types";
import { Schema, model, ValidatorProps } from "mongoose";
import { ApiError } from "../tools";

const schema = new Schema<IBudgets>(
  {
    _user: { type: String, required: true },
    _current: { type: Number, default: 0 },
    _budget: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          if (value <= 0) throw new Error(`Budget value ${value} must be higher than 1`);
        },
        message: (props: ValidatorProps & { reason: Error }) => props.reason.message,
      },
    },
    _title: { type: String, required: true, unique: true },
    expenses: [
      {
        title: { type: String, required: true },
        cost: {
          type: Number,
          required: true,
          validate: {
            validator: function (value: number) {
              if (value <= 0) throw new ApiError(400, `Expense value ${value} must be higher than 1`);
            },
            message: (props: ValidatorProps & { reason: ApiError }) => props.reason.error,
          },
        },
        created: { type: String },
      },
    ],
  },
  { versionKey: false },
);

export default model("budgets", schema);
