import { Router, json } from "express";
import UserController from "./user.controller";

const userRoutes = Router();

userRoutes.get("/me", UserController.me);

export default userRoutes;
