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
      if (e.name === "ValidationError") return next(new ApiError(400, e.errors["_budget"].message));
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
      if (e.name === "ValidationError") return next(new ApiError(400, e.errors["_budget"].message));
      next(e);
    }
  }
}
