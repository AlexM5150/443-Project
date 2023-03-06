import { IAccounts } from "../types";
import { Schema, model } from "mongoose";

const schema = new Schema<IAccounts>(
  {
    email: { type: String, unique: true },
    password: String,
    budget: { type: Number, default: 0 },
  },
  { versionKey: false },
);

export default model("accounts", schema);
