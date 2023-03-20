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
        category: { type: String, required: true},
        current: { type: Number, default: 0 },
        budget: {
          type: Number,
          required: true,
          validate: {
            validator: function (value: number) {
              if (value <= 0) throw new Error(`Category budget ${value} must be higher than 1`);
            },
            message: (props: ValidatorProps & { reason: Error }) => props.reason.message,
          },
        },
        expenses: [
          {
            title: { type: String, required: true },
            cost: {
              type: Number,
              required: true,
              validate: {
                validator: function (value: number) {
                  if (value <= 0) throw new Error(`Category expense ${value} must be higher than 1`);
                },
                message: (props: ValidatorProps & { reason: Error }) => props.reason.message,
              },
            },
            created: { type: String },
          },
        ],
      },
    ],
  },
  { versionKey: false },
);

export default model("budgets", schema);
