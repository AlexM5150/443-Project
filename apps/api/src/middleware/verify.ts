import { verify } from "jsonwebtoken";
import { ApiError, env } from "../tools";
import { Request, Response, NextFunction } from "express";
import { accountSchema } from "../schemas";

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
      const result = await accountSchema.findOne({ _id: userId });
      if (!result) throw new ApiError(404, `User ${userId} not found`);
      req.user = { id: userId };
      next();
    } catch (e) {
      next(e);
    }
  }
}
