import { Router, json } from "express";
import UserController, { BudgetController } from "./user.controller";

const userRoutes = Router();
userRoutes.get("/me", UserController.me);
userRoutes.delete("/me", UserController.delete);
userRoutes.post("/me/profile", json(), UserController.profile);

const budgetRoutes = Router();
budgetRoutes.post("/", BudgetController.create);
budgetRoutes.delete("/", BudgetController.delete);
budgetRoutes.get("/", BudgetController.get);
budgetRoutes.put("/", BudgetController.update);
budgetRoutes.put("/reset", BudgetController.reset);

budgetRoutes.get("/expenses", BudgetController.getExpense);
budgetRoutes.post("/expenses", BudgetController.addExpense);
budgetRoutes.delete("/expenses", BudgetController.delExpense);

userRoutes.use("/budget", json(), budgetRoutes);

export default userRoutes;
