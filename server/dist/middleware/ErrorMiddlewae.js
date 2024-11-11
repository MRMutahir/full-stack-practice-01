import { ZodError } from "zod";
import { formateError } from "../Helpers/helper.js";
const errorMiddleware = async (error, req, res, next) => {
    if (error instanceof ZodError) {
        const errors = formateError(error);
        return res.status(400).json({
            success: false,
            errors
        });
    }
    const status = 500;
    const message = error.message;
    res.status(status).json({
        success: false,
        error: {
            status,
            message
        }
    });
};
export { errorMiddleware };
