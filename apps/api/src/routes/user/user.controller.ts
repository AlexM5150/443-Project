import { Request, Response, NextFunction } from "express";

export default class UserController {
  static async me(req: Request, res: Response, next: NextFunction) {
    const { user } = req;
    try {
      res.json({ code: 200, message: `User ${user._id} profile`, data: user });
    } catch (e) {
      next(e);
    }
  }
}
