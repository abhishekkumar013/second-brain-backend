import { UserModel } from "../models/user.model.ts";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHhandler.ts";
import { ErrorHandler } from "../utils/errorHandler.ts";
import { ApiResponse } from "../utils/apiResponse.ts";
import { ContentModel } from "../models/content.model.js";

export const createContent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { link, type, title, tag = [], userId } = req.body;

      if (!type || !title || !userId) {
        throw new ErrorHandler("Missing required fields", 400);
      }

      if (!Array.isArray(tag)) {
        throw new ErrorHandler("Tag must be an array", 400);
      }
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new ErrorHandler("User not found", 404);
      }
      const content = await ContentModel.create({
        link,
        type,
        title,
        tag,
        userId,
      });

      return res
        .status(200)
        .json(new ApiResponse(200, content, "created successfully"));
    } catch (error) {
      next(error);
    }
  }
);

export const getContent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const content = await ContentModel.find({ userId });

      return res
        .status(200)
        .json(new ApiResponse(200, content, "fetched successfully"));
    } catch (error) {
      next(error);
    }
  }
);
export const deleteContent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contentId } = req.params;
      const userId = req.userId;
      if (!contentId) {
        throw new ErrorHandler("Content ID is required", 400);
      }

      const content = await ContentModel.findOneAndDelete({
        _id: contentId,
        userId,
      });

      if (!content) {
        throw new ErrorHandler("Content not found or unauthorized", 404);
      }

      return res
        .status(200)
        .json(new ApiResponse(200, content, "deleted successfully"));
    } catch (error) {
      next(error);
    }
  }
);
