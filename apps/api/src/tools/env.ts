import dotenv from "dotenv";

dotenv.config();

const env = {
  // SERVER ENV
  PORT: process.env.PORT ?? "8080",
  DOMAIN: process.env.DOMAIN ?? "",
  WEB_URL: process.env.WEB_URL ?? process.env.DOMAIN,
  // MONGODB ENV
  DB_URL: process.env.DB_URL ?? "mongodb://localhost:27017",
  DB_NAME: process.env.DB_NAME ?? "cecs443",
  DB_USER: process.env.DB_USER ?? "user",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "password",
  // KEYS ENV
  JWT_KEY: process.env.JWT_KEY ?? "00dtJhGDtu14YaXLuAzbqt+HdlFeUt5eYiyCYkm/LAxKrCmZyRVcIwXHMzIZIYy6",
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY ?? "110155b4eb4821d394b9daa0954861a534d3f61724a8da7281976044dddda82b",
  IV_KEY: process.env.IV_KEY ?? "65dcc4b5e53cc29d7b61d8e689438c98",
};

console.log(env)

export default env;