import { Request, Response, NextFunction } from "express";
import { accountsSchema } from "../../schemas";

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
