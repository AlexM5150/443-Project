import { verify } from "jsonwebtoken";
import { ApiError, env } from "../tools";
import { accountsSchema } from "../schemas";
import { Request, Response, NextFunction } from "express";

export default class Verify {
  static authToken(authorization: string): string {
    if (!authorization) throw new ApiError(403, "Authorization header not found");
    const token = authorization.split(" ")[1];
    if (token === undefined) throw new ApiError(403, "User token not connected");
    const result = verify(token, env.JWT_KEY) as { userId: string };
    return result.userId;
  }

  static async user(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      const userId = Verify.authToken(authorization);
      const result = await accountsSchema.findOne({ _id: userId }, "budget");
      if (!result) throw new ApiError(404, `User ${userId} not found`);
      req.user = result;
      next();
    } catch (e) {
      next(e);
    }
  }
}
