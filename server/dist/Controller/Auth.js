import { hashPassword } from "../Helpers/PasswordHelper.js";
import { registerValidator } from "../Validator/RegisterValidator.js";
const register = async (req, res, next) => {
    try {
        const body = req.body;
        // Validating the request body with Zod schema
        const validateBody = registerValidator.parse(body);
        const { name, email, password } = validateBody;
        const passwordHash = await hashPassword(password);
        const payload = {
            name,
            email,
            password: passwordHash
        };
        // let user = await prisma.user.findUnique({
        //   where: {
        //     email: payload.email
        //   }
        // });
        // if (user) {
        //   return res.status(400).json({ message: "This email is already in use" });
        // }
        // Create a new user if it doesn't exist
        // await prisma.user.create({ data: payload });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        // if (error instanceof ZodError) {
        //   // If validation fails, send Zod errors in response
        //   return res
        //     .status(400)
        //     .json({ message: "Validation error", errors: error.errors });
        // }
        next(error);
    }
};
export { register };
