import { Router, json } from "express";
import AuthController from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/sign-up", AuthController.signUp);

export default authRoutes;
