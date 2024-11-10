// Helpers/helper.js
import { ZodError } from "zod";

const formateError = (error: ZodError) => {
    const errors: any = {};
    error.errors?.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
    });
    return errors;
};

export { formateError };
