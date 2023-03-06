import { Router, json } from "express";
import UserController, { BudgetController } from "./user.controller";

const userRoutes = Router();
userRoutes.get("/me", UserController.me);
userRoutes.delete("/me", UserController.delete);

const budgetRoutes = Router();
budgetRoutes.post("/", BudgetController.create);
budgetRoutes.delete("/", BudgetController.delete);
budgetRoutes.get("/", BudgetController.get);
budgetRoutes.put("/", BudgetController.update);

userRoutes.use("/budget", json(), budgetRoutes);

export default userRoutes;
