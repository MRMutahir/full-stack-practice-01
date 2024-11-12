import { hashPassword } from "../Helpers/PasswordHelper.js";
import { registerValidator } from "../Validator/RegisterValidator.js";
import { emailRenderEjs } from "../Helpers/helper.js";
const register = async (req, res, next) => {
    try {
        const body = req.body;
        const validateBody = registerValidator.parse(body);
        const { name, email, password } = validateBody;
        const passwordHash = await hashPassword(password);
        const payload = {
            name,
            email,
            password: passwordHash
        };
        const url = "";
        await emailRenderEjs("account-verify", { name: payload.name, url });
        // let user = await prisma.user.findUnique({
        //   where: {
        //     email: payload.email
        //   }
        // });
        // if (user) {
        //   res.status(400).json({ message: "This email is already in use" });
        // }
        // await prisma.user.create({ data: payload });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        next(error);
    }
};
export { register };
