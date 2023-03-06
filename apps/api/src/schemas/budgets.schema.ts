import { IBudgets } from "../types";
import { Schema, model } from "mongoose";

const schema = new Schema<IBudgets>(
  {
    _user: { type: String, required: true },
    _current: { type: Number, default: 0 },
    _budget: {
      type: Number,
      required: true,
      min: [1, "Budget value must be higher than 1"],
    },
    _title: { type: String, required: true, unique: true },
    expenses: [
      {
        title: { type: String, required: true },
        cost: { type: Number, required: true },
        created: { type: String },
      },
    ],
  },
  { versionKey: false },
);

export default model("budgets", schema);
