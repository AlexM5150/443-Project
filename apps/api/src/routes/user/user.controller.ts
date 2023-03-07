import { ApiError } from "../../tools";
import { Request, Response, NextFunction } from "express";
import { accountsSchema, budgetsSchema } from "../../schemas";

export default class UserController {
  static async me(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    try {
      res.json({ code: 200, message: `User ${user._id} profile`, data: user });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    try {
      await accountsSchema.deleteOne({ _id: user._id });
      res.json({ code: 200, message: `Deleted user ${user._id}` });
    } catch (e) {
      next(e);
    }
  }

  static async profile(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { budget, username } = req.body;
    try {
      ApiError.check("body", { budget, username });
      const result = await accountsSchema.updateOne({ _id: user._id }, { $set: { username, budget } });
      if (!result) throw new ApiError(404, "User update failed");
      res.json({ code: 200, message: `Updated user ${user._id}` });
    } catch (e) {
      next(e);
    }
  }
}

export class BudgetController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { _budget, _title } = req.body;
    try {
      ApiError.check("body", { _budget, _title });
      const result = await budgetsSchema.create({ _user: user._id, _title, _budget });
      res.json({ code: 200, message: `Created new budget ${_title}`, data: result });
    } catch (e) {
      if (e.code === 11000) return next(new ApiError(409, `Budget: ${_title} already exists`));
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.query as { id: string };
    try {
      ApiError.check("query", { id });
      const result = await budgetsSchema.deleteOne({ _id: id, _user: user._id });
      if (!result.deletedCount) throw new ApiError(404, `Budget ${id} not found`);
      res.json({ code: 200, message: `Deleted budget ${id}` });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    try {
      const result = await budgetsSchema.find({ _user: user._id });
      res.json({ code: 200, message: `You have ${result.length} budgets`, data: result });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { _budget, _title, _id } = req.body;
    try {
      ApiError.check("body", { _budget, _title, _id });
      const result = await budgetsSchema.updateOne(
        { _id, _user: user._id },
        { $set: { _title, _budget } },
        { runValidators: true },
      );
      const { acknowledged, modifiedCount } = result;
      if (!acknowledged || modifiedCount === 0) throw new ApiError(404, `Budget ${_id} update failed`);
      res.json({ code: 200, message: `Update budget ${_title}`, data: result });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  static async reset(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.query as { id: string };
    try {
      ApiError.check("query", { id });
      const doc = await budgetsSchema.findOneAndUpdate(
        { _id: id, _user: user._id },
        { $set: { _current: 0, expenses: [] } },
        { new: true },
      );
      if (!doc) throw new ApiError(404, "Budget not found");
      res.json({ code: 200, message: `Expenses reset`, data: doc });
    } catch (e) {
      next(e);
    }
  }

  static async createCat(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { category, budget, id } = req.body;
    try {
      ApiError.check("body", { category, budget, id });
      const doc = await budgetsSchema.findOne({ _id: id, _user: user._id });
      if (!doc) throw new ApiError(404, `Budget ${id} not found`);
      if (doc._budget < budget)
        throw new ApiError(400, `Category budget ${budget} must be lower than budget ${doc._budget}`);
      const categories = doc.expenses.map((cat) => cat.category);
      console.log("categories", categories);
      if (categories.includes(category)) throw new ApiError(400, `Category ${category} already exists`);
      const update = await budgetsSchema.findOneAndUpdate(
        { _id: id, _user: user._id, "expenses.category": { $ne: category } },
        { $push: { expenses: { category, budget } } },
        { new: true },
      );
      if (!update) throw new ApiError(400, `Failed to add category: ${category}`);
      res.json({ code: 200, message: `Created category ${category}`, data: update });
    } catch (e) {
      next(e);
    }
  }

  static async deleteCat(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id, category } = req.query as { id: string; category: string };
    try {
      ApiError.check("query", { id, category });
      const doc = await budgetsSchema.updateOne(
        { _id: id, _user: user._id, expenses: { $elemMatch: { _id: category } } },
        { $pull: { expenses: { _id: category } } },
      );
      if (!doc) throw new ApiError(404, `Category ${category} not found`);
      res.json({ code: 200, message: `Deleted category ${category}` });
    } catch (e) {
      next(e);
    }
  }

  static async getExpense(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { id } = req.query as { id: string };
    try {
      ApiError.check("query", { id });
      const doc = await budgetsSchema.findOne({ _id: id, _user: user._id });
      if (!doc) throw new ApiError(404, "Budget not found");
      res.json({ code: 200, message: `Expenses added`, data: doc });
    } catch (e) {
      next(e);
    }
  }

  static async addExpense(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { _id, title, cost } = req.body;
    try {
      ApiError.check("body", { _id, title, cost });
      const doc = await budgetsSchema.findOneAndUpdate(
        { _id, _user: user._id },
        {
          $inc: { _current: cost },
          $push: { expenses: { title, cost, created: new Date().toLocaleString() } },
        },
        { runValidators: true, new: true },
      );
      if (!doc) throw new ApiError(404, "Budget not found");
      res.json({ code: 200, message: `Expenses added`, data: doc.expenses });
    } catch (e) {
      next(e);
    }
  }

  static async delExpense(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    const { _id, cost, title } = req.body;
    const { budget } = req.query as { budget: string };
    try {
      ApiError.check("query", { budget });
      ApiError.check("body", { _id, cost, title });
      const doc = await budgetsSchema.updateOne(
        { _id: budget, _user: user._id, expenses: { $elemMatch: { _id } } },
        {
          $pull: { expenses: { _id } },
          $inc: { _current: -cost },
        },
      );
      if (!doc.modifiedCount) throw new ApiError(404, `Expense ${title} not found`);
      res.json({ code: 200, message: `Deleted expense ${title} from ${budget}` });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
}
