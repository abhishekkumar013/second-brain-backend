import { Request, Response, NextFunction } from "express";

class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = res.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (err.name === "CastError") {
    err = new ErrorHandler(`Invalid ${err.path}`, 400);
  }

  if (err.code === 11000) {
    err = new ErrorHandler(
      `Duplicate ${Object.keys(err.keyValue)} Entered`,
      400
    );
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid Token, Try again!", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Expired Token, Login Please!", 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export { ErrorHandler };
