import { Router } from "express";
import AuthController from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/sign-in", AuthController.signIn);
authRoutes.post("/sign-up", AuthController.signUp);

export default authRoutes;
