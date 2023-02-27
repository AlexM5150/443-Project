import { Router, json } from "express";
import UserController from "./user.controller";

const userRoutes = Router();

userRoutes.get("/me", UserController.me);
userRoutes.delete("/me", UserController.delete);

export default userRoutes;
