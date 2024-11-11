import express, { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formateError } from "../Helpers/helper.js";

const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (error instanceof ZodError) {
    const errors = formateError(error);
    res.status(400).json({
      success: false,
      errors
    });
  } else {
    const status = 500;
    const message = error.message;
    res.status(status).json({
      success: false,
      error: {
        status,
        message
      }
    });
  }

  next();
};

export { errorMiddleware };
