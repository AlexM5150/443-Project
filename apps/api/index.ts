import cors from "cors";
import { parse } from "url";
import { AxiosError } from "axios";
import routes from "./src/routes/index.routes";
import { ApiError, env, initDatabase } from "./src/tools";
import express, { Request, Response, NextFunction } from "express";

declare module "express" {
  export interface Request {
    user: { _id: string; budget: number };
  }
}

const app = express();

app.use(cors({ origin: [env.WEB_URL, env.DOMAIN], credentials: true }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  const url = parse(req.url);
  console.log(`${req.method} ${url.pathname} ${url.query || ""}`);
  next();
});

app.use("/api", routes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) return res.status(err.code).json(err);
  if (err instanceof AxiosError && err.response.data) return res.status(err.response.status).json(err.response.data);
  if (err instanceof Error) {
    if ("errors" in err) return res.status(400).json({ code: 400, message: err.message.split(":")[2].trim() });
    return res.status(400).json({ code: 400, message: err.message });
  }
  console.error(err, "[API] error");
  res.status(500).send({ code: 500, error: "Something went wrong. Check logs" });
});

initDatabase();

app.listen(env.PORT, () => console.log(`Server listening on port: ${env.PORT}`));
