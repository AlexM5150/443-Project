import cors from "cors";
import { parse } from "url";
import { AxiosError } from "axios";
import routes from "./src/routes/index.routes";
import { ApiError, env, initDatabase } from "./src/tools";
import express, { Request, Response, NextFunction } from "express";

declare module "express" {
  export interface Request {
    user: { id: string };
  }
}

const app = express();

app.use(cors());

app.use((req: Request, _res: Response, next: NextFunction) => {
  const url = parse(req.url);
  console.log(`${req.method} ${url.pathname} ${url.query || ""}`);
  next();
});

app.use("/api", routes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) return res.status(err.status).json(err);
  if (err instanceof AxiosError && err.response.data) return res.status(err.response.status).json(err.response.data);
  console.error(err, "[API] error");
  res.status(500).send({ status: 500, error: "Something went wrong. Check logs" });
});

initDatabase();

app.listen(env.PORT, () => console.log(`Server listening on port: ${env.PORT}`));
