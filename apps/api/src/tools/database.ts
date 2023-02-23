import env from "./env";
import mongoose from "mongoose";

export default async function initDatabase() {
  mongoose.set("strictQuery", true);
  mongoose.connect(`${env.DB_URL}/${env.DB_NAME}`, {
    user: env.DB_USER,
    pass: env.DB_PASSWORD,
    authSource: "admin",
  });

  const { connection } = mongoose;

  connection.on("open", () => console.log(`Connected to ${env.DB_NAME} database`));

  connection.on("error", (e) => {
    console.error("connection failed", e);
    process.exit(1);
  });
}
