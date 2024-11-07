import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    secure: false,
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD
    },
    logger: true, // Enable logging
    debug: true // Show debug output
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
