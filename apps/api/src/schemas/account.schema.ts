import { Schema, model } from "mongoose";
import { IAccounts } from "../types";

const schema = new Schema<IAccounts>(
  {
    _id: String,
  },
  { versionKey: false },
);

export default model("accounts", schema);
