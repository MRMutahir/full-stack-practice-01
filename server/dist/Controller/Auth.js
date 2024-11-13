import { hashPassword } from "../Helpers/PasswordHelper.js";
import { registerValidator } from "../Validator/RegisterValidator.js";
import { prisma } from "../config/database.js";
import { emailRenderEjs } from "../Helpers/helper.js";
import { uuid } from "uuidv4";
import { emailQueue, emailQueueName } from "../jobs/EmailsJob.js";
const register = async (req, res, next) => {
    try {
        const body = req.body;
        const validateBody = registerValidator.parse(body);
        const { name, email, password } = validateBody;
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            res.status(409).json({
                success: false,
                message: "User already exists with this email."
            });
        }
        const passwordHash = await hashPassword(password);
        const payload = {
            name,
            email,
            password: passwordHash
        };
        const url = `${process.env.Account_Verify_Url_Frontend}/verify-account?email=${payload.email}&token=${uuid()}`;
        const html = await emailRenderEjs("account-verify", {
            name: payload.name,
            url
        });
        await emailQueue.add(emailQueueName, {
            to: payload.email,
            subject: "Please verify your email Clash",
            html
        });
        await prisma.user.create({ data: payload });
        // Send success response
        res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email."
        });
    }
    catch (error) {
        next(error);
    }
};
export { register };
