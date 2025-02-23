import { asyncHandler } from "../utils/asyncHhandler.ts";
import { ErrorHandler } from "../utils/errorHandler.ts";
import jwt from "jsonwebtoken";

export const isAuth = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ErrorHandler("Unauthorized request", 401);
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (error) {
    next(error);
  }
});
