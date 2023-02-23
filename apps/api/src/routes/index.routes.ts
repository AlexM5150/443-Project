import { Router } from "express";
import userRoutes from "./user/user.routes";
import authRoutes from "./auth/auth.routes";
import { Verify } from "../middleware";

const routes = Router();

routes.use("/user", Verify.user, userRoutes);
routes.use("/auth", authRoutes);

export default routes;
