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

const categoryRoutes = Router();
categoryRoutes.post("/", BudgetController.createCat);
categoryRoutes.delete("/", BudgetController.deleteCat);

budgetRoutes.get("/expenses", BudgetController.getExpense);
budgetRoutes.post("/expenses", BudgetController.addExpense);
budgetRoutes.delete("/expenses", BudgetController.delExpense);

budgetRoutes.use("/category", json(), categoryRoutes);
userRoutes.use("/budget", json(), budgetRoutes);

export default userRoutes;
