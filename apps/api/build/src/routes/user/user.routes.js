"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importStar(require("./user.controller"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/me", user_controller_1.default.me);
userRoutes.delete("/me", user_controller_1.default.delete);
userRoutes.post("/me/profile", (0, express_1.json)(), user_controller_1.default.profile);
const budgetRoutes = (0, express_1.Router)();
budgetRoutes.post("/", user_controller_1.BudgetController.create);
budgetRoutes.delete("/", user_controller_1.BudgetController.delete);
budgetRoutes.get("/", user_controller_1.BudgetController.get);
budgetRoutes.put("/", user_controller_1.BudgetController.update);
budgetRoutes.put("/reset", user_controller_1.BudgetController.reset);
const categoryRoutes = (0, express_1.Router)();
categoryRoutes.post("/", user_controller_1.BudgetController.createCat);
categoryRoutes.delete("/", user_controller_1.BudgetController.deleteCat);
categoryRoutes.get("/", user_controller_1.BudgetController.getCat);
categoryRoutes.put("/", user_controller_1.BudgetController.editCat);
categoryRoutes.get("/expenses", user_controller_1.BudgetController.getExpense);
categoryRoutes.post("/expenses", user_controller_1.BudgetController.addExpense);
categoryRoutes.delete("/expenses", user_controller_1.BudgetController.delExpense);
categoryRoutes.put("/expenses", user_controller_1.BudgetController.editExpense);
budgetRoutes.use("/category", (0, express_1.json)(), categoryRoutes);
userRoutes.use("/budget", (0, express_1.json)(), budgetRoutes);
exports.default = userRoutes;
//# sourceMappingURL=user.routes.js.map