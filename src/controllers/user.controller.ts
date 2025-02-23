import { UserModel } from "../models/user.model.ts";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHhandler.ts";
import { ErrorHandler } from "../utils/errorHandler.ts";
import { ApiResponse } from "../utils/apiResponse.ts";

export const createUserController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ErrorHandler("All Fields Required", 401);
      }
      const isUserExist = await UserModel.findOne({ username });
      if (isUserExist) {
        throw new ErrorHandler("Username already exists.", 401);
      }
      const user = await UserModel.create({
        username: username,
        password: password,
      }).select("-password");

      return res
        .status(200)
        .json(new ApiResponse(200, user, "singup successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export const LoginUserController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ErrorHandler("All Fields Required", 401);
      }

      const isuser = await UserModel.findOne({ username }).select("-password");

      if (!isuser) {
        throw new ErrorHandler("Invalid Credentials", 401);
      }
      const ispasswordmatch = await isuser.isPasswordCorrect(password);
      if (!ispasswordmatch) {
        throw new ErrorHandler("Invalid Credentials", 401);
      }

      const token = await isuser.generateJwtToken();

      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(200, { user: isuser }, "Login successfully"));
    } catch (error) {
      next(error);
    }
  }
);
