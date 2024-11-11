import { registerValidator } from "../validator/RegisterValidator.js";
const register = async (req, res, next) => {
    try {
        const body = req.body;
        const validateBody = registerValidator.parse(body);
        res.json({ body: validateBody });
    }
    catch (error) {
        next(error);
    }
};
export { register };
