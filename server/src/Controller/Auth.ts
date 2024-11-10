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
        if (error instanceof ZodError) {
            const errors = formateError(error);
            return res.status(402).json(errors);
        }
        next(error);  // Any other errors will be passed to the next middleware
    }
};

export { register };
