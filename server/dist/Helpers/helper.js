import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
const formateError = (error) => {
    const errors = {};
    error.errors?.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
    });
    return errors;
};
const emailRenderEjs = async (fileName, payload) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const validPath = path.resolve(__dirname, "..");
    const html = await ejs.renderFile(validPath + `/views/emails/${fileName}.ejs`, payload);
    return html;
};
export { formateError, emailRenderEjs };
