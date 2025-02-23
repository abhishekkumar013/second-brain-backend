import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHhandler.ts";
import { ErrorHandler } from "../utils/errorHandler.ts";
import { ApiResponse } from "../utils/apiResponse.ts";
import { TagModel } from "../models/tag.model.js";

export const createTag = asyncHandler(
  async (req: Request, res: Response, next: Response) => {
    try {
      const { title } = req.body;
      if (!title) {
        throw new ErrorHandler("title required", 401);
      }
      const tag = await TagModel.create({ title });
      res
        .status(201)
        .json(ApiResponse.success(200, tag, ` ${title} created successfully`));
    } catch (error) {
      next(error);
    }
  }
);
