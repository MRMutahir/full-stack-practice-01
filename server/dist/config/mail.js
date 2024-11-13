import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
configDotenv();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD
    },
    logger: false,
    debug: false
});
export const sendEmail = async (to, subject, body) => {
    try {
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: to,
            subject: subject,
            html: body
        });
    }
    catch (error) {
        console.log("sendEmail error", error);
    }
};
