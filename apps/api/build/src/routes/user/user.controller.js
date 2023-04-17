"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const tools_1 = require("../../tools");
const schemas_1 = require("../../schemas");
class UserController {
    static me(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                res.json({ code: 200, message: `User ${user._id} profile`, data: user });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                yield schemas_1.accountsSchema.deleteOne({ _id: user._id });
                res.json({ code: 200, message: `Deleted user ${user._id}` });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { budget, username } = req.body;
            try {
                tools_1.ApiError.check("body", { budget, username });
                const result = yield schemas_1.accountsSchema.updateOne({ _id: user._id }, { $set: { username, budget } });
                if (!result)
                    throw new tools_1.ApiError(404, "User update failed");
                res.json({ code: 200, message: `Updated user ${user._id}` });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = UserController;
class BudgetController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { _budget, _title } = req.body;
            try {
                tools_1.ApiError.check("body", { _budget, _title });
                const result = yield schemas_1.budgetsSchema.create({ _user: user._id, _title, _budget });
                res.json({ code: 200, message: `Created new budget ${_title}`, data: result });
            }
            catch (e) {
                if (e.code === 11000)
                    return next(new tools_1.ApiError(409, `Budget: ${_title} already exists`));
                next(e);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.query;
            try {
                tools_1.ApiError.check("query", { id });
                const result = yield schemas_1.budgetsSchema.deleteOne({ _id: id, _user: user._id });
                if (!result.deletedCount)
                    throw new tools_1.ApiError(404, `Budget ${id} not found`);
                res.json({ code: 200, message: `Deleted budget ${id}` });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const result = yield schemas_1.budgetsSchema.find({ _user: user._id });
                res.json({ code: 200, message: `You have ${result.length} budgets`, data: result });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { _budget, _title, _id } = req.body;
            try {
                tools_1.ApiError.check("body", { _budget, _title, _id });
                const result = yield schemas_1.budgetsSchema.updateOne({ _id, _user: user._id }, { $set: { _title, _budget } }, { runValidators: true });
                const { acknowledged, modifiedCount } = result;
                if (!acknowledged || modifiedCount === 0)
                    throw new tools_1.ApiError(404, `Budget ${_id} update failed`);
                res.json({ code: 200, message: `Update budget ${_title}`, data: result });
            }
            catch (e) {
                console.error(e);
                next(e);
            }
        });
    }
    static reset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id } = req.query;
            try {
                tools_1.ApiError.check("query", { id });
                const doc = yield schemas_1.budgetsSchema.findOneAndUpdate({ _id: id, _user: user._id }, { $set: { _current: 0, expenses: [] } }, { new: true });
                if (!doc)
                    throw new tools_1.ApiError(404, "Budget not found");
                res.json({ code: 200, message: `Expenses reset`, data: doc });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static createCat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { category, budget, id } = req.body;
            try {
                tools_1.ApiError.check("body", { category, budget, id });
                const doc = yield schemas_1.budgetsSchema.findOne({ _id: id, _user: user._id });
                if (!doc)
                    throw new tools_1.ApiError(404, `Budget ${id} not found`);
                if (doc._budget < budget)
                    throw new tools_1.ApiError(400, `Category budget ${budget} must be lower than budget ${doc._budget}`);
                const categories = doc.expenses.map((cat) => cat.category);
                const sum = doc.expenses.map((cat) => cat.budget).reduce((a, b) => a + b, 0) + budget;
                if (sum > doc._budget)
                    throw new tools_1.ApiError(400, `The sum of categories budget must be lower than ${doc._budget}`);
                if (categories.includes(category))
                    throw new tools_1.ApiError(400, `Category ${category} already exists`);
                const update = yield schemas_1.budgetsSchema.findOneAndUpdate({ _id: id, _user: user._id, "expenses.category": { $ne: category } }, { $push: { expenses: { category, budget } } }, { new: true });
                if (!update)
                    throw new tools_1.ApiError(400, `Failed to add category: ${category}`);
                res.json({ code: 200, message: `Created category ${category}`, data: update });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteCat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id, category } = req.query;
            try {
                tools_1.ApiError.check("query", { id, category });
                const doc = yield schemas_1.budgetsSchema.updateOne({ _id: id, _user: user._id, expenses: { $elemMatch: { _id: category } } }, { $pull: { expenses: { _id: category } } });
                if (!doc)
                    throw new tools_1.ApiError(404, `Category ${category} not found`);
                res.json({ code: 200, message: `Deleted category ${category}` });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getCat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id, category } = req.query;
            try {
                tools_1.ApiError.check("query", { id, category });
                const doc = yield schemas_1.budgetsSchema.findOne({
                    _id: id,
                    _user: user._id,
                    expenses: { $elemMatch: { _id: category } },
                }, { "expenses.$": 1 });
                if (!doc)
                    throw new tools_1.ApiError(404, `Category ${category} not found`);
                res.json({ code: 200, message: `Found category ${category}`, data: doc.expenses[0] });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editCat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id, category, title, budget } = req.body;
            try {
                tools_1.ApiError.check("body", { id, category, title, budget });
                const doc = yield schemas_1.budgetsSchema.findOne({ _id: id, _user: user._id, expenses: { $elemMatch: { _id: category } } }, { expenses: 1, _budget: 1 });
                if (!doc)
                    throw new tools_1.ApiError(404, `Category ${category} not found`);
                if (budget > doc._budget)
                    throw new tools_1.ApiError(400, `Category budget ${budget} must be lower than budget ${doc._budget}`);
                const matchingCategory = doc.expenses.filter((subdoc) => subdoc._id.toString() === category)[0];
                const categoriesBudget = doc.expenses.map((subdoc) => subdoc.budget).reduce((a, b) => a + b, 0);
                const newCatBudget = categoriesBudget - matchingCategory.budget + budget;
                let exceed = null;
                if (newCatBudget > doc._budget)
                    exceed = `Sum of categories ${newCatBudget} exceed budget ${doc._budget}`;
                const expenses = matchingCategory.expenses.map((exp) => exp.cost).reduce((a, b) => a + b, 0);
                if (budget < expenses)
                    exceed = `The expenses of ${category} exceed the new budget ${budget}`;
                const update = yield schemas_1.budgetsSchema.updateOne({ _id: id, _user: user._id, expenses: { $elemMatch: { _id: category } } }, { $set: { "expenses.$.category": title, "expenses.$.budget": budget } });
                if (!update)
                    throw new tools_1.ApiError(400, `Failed to update category ${category}`);
                res.json({ code: 200, message: `Updated category ${category}`, data: { exceed } });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getExpense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id, category, expense } = req.query;
            try {
                tools_1.ApiError.check("query", { id, category, expense });
                const doc = yield schemas_1.budgetsSchema.findOne({
                    _id: id,
                    _user: user._id,
                    "expenses.expenses": { $elemMatch: { _id: expense } },
                }, { "expenses.expenses.$": 1 });
                if (!doc)
                    throw new tools_1.ApiError(404, "Expense not found");
                const matchingExpense = doc.expenses[0].expenses.filter((subdoc) => subdoc._id.toString() === expense)[0];
                res.json({ code: 200, message: `Found expense ${expense} from category ${category}`, data: matchingExpense });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static addExpense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id, category, title, cost } = req.body;
            try {
                tools_1.ApiError.check("body", { id, category, title, cost });
                const doc = yield schemas_1.budgetsSchema.findOne({ _id: id, _user: user._id, expenses: { $elemMatch: { _id: category } } }, "expenses.$ _current _budget");
                if (!doc)
                    throw new tools_1.ApiError(404, `Category ${category} not found`);
                const { _current, expenses, _budget } = doc;
                let exceed = null;
                if (expenses[0].current + cost > expenses[0].budget)
                    exceed = `You exceed your category budget ${expenses[0].budget}`;
                if (_current + cost > _budget)
                    exceed = `You exceed your budget ${_budget}`;
                const update = yield schemas_1.budgetsSchema.findOneAndUpdate({ _id: id, _user: user._id, expenses: { $elemMatch: { _id: category } } }, {
                    $inc: { _current: cost, "expenses.$.current": cost },
                    $push: { "expenses.$.expenses": { title, cost, created: new Date().toLocaleString() } },
                }, { runValidators: true, new: true });
                if (!update)
                    throw new tools_1.ApiError(404, `Failed to add expense ${title} to category ${category}`);
                res.json({ code: 200, message: `Expenses added`, data: { document: update, exceed } });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static delExpense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id, category, expense } = req.body;
            try {
                tools_1.ApiError.check("body", { id, category, expense });
                const doc = yield schemas_1.budgetsSchema.findOne({ _id: id, _user: user._id, "expenses.expenses": { $elemMatch: { _id: expense } } }, { "expenses.expenses.$": 1, _budget: 1, _current: 1 });
                if (!doc)
                    throw new tools_1.ApiError(404, `Expense ${category} not found`);
                const matchingExpense = doc.expenses[0].expenses.filter((subdoc) => subdoc._id.toString() === expense)[0];
                const update = yield schemas_1.budgetsSchema.updateOne({ _id: id, _user: user._id, "expenses.expenses": { $elemMatch: { _id: expense } } }, {
                    $inc: { _current: -matchingExpense.cost, "expenses.$.current": -matchingExpense.cost },
                    $pull: { "expenses.$.expenses": { _id: expense } },
                });
                if (!update || !update.modifiedCount)
                    throw new tools_1.ApiError(400, `Failed to delete expense ${expense} from category ${category}`);
                console.log(update);
                res.json({ code: 200, message: `Expense ${expense} deleted` });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editExpense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { id, category, expense, title, cost } = req.body;
            try {
                tools_1.ApiError.check("body", { id, category, expense, title, cost });
                const doc = yield schemas_1.budgetsSchema.findOne({ _id: id, _user: user._id, "expenses.expenses": { $elemMatch: { _id: expense } } }, { expenses: 1, _budget: 1, _current: 1 });
                if (!doc)
                    throw new tools_1.ApiError(404, "Expense not found");
                const matchingCategory = doc.expenses.filter((subdoc) => subdoc._id.toString() === category)[0];
                const matchingExpense = matchingCategory.expenses.filter((subdoc) => subdoc._id.toString() === expense)[0];
                const sumExpenses = matchingCategory.expenses.map((subdoc) => subdoc.cost).reduce((a, b) => a + b, 0) - matchingExpense.cost + cost;
                let exceed = null;
                if (sumExpenses > matchingCategory.budget)
                    exceed = `Sum of expenses ${sumExpenses} exceed the category budget ${matchingCategory.budget}`;
                if (doc._current - matchingExpense.cost + cost > doc._budget)
                    exceed = `New expense exceeds the budget ${doc._budget}`;
                const update = yield schemas_1.budgetsSchema.updateOne({ _id: id, _user: user._id, "expenses.expenses": { $elemMatch: { _id: expense } } }, {
                    $set: {
                        "expenses.$[outer].expenses.$[inner].title": title,
                        "expenses.$[outer].expenses.$[inner].cost": cost,
                        "expenses.$[outer].current": matchingCategory.current - matchingExpense.cost + cost,
                        _current: doc._current - matchingExpense.cost + cost,
                    },
                }, { arrayFilters: [{ "outer._id": category }, { "inner._id": expense }] });
                if (!update)
                    throw new tools_1.ApiError(400, `Failed to update category ${category}`);
                res.json({ code: 200, message: `Found expense ${expense} from category ${category}`, data: { exceed } });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.BudgetController = BudgetController;
//# sourceMappingURL=user.controller.js.map