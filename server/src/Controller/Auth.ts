// Controller/Auth.js
import { Request, Response, NextFunction } from "express";
import { registerValidator } from "../validator/RegisterValidator.js";
import { formateError } from "../Helpers/helper.js";
import { ZodError } from "zod";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const validateBody = registerValidator.parse(body);
    res.json({ body: validateBody });
  } catch (error) {
    next(error);
  }
};

export { register };
