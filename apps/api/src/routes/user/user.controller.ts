import { Request, Response, NextFunction } from "express";

export default class UserController {
  static async me(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "/user path" });
  }
}
