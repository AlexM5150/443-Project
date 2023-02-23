import { Request, Response, NextFunction } from "express";

export default class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "/auth/sign-up path" });
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "/auth/login path" });
  }
}
