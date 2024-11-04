import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD
    }
});
export const sendEmail = async (to, subject, body) => {
    await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        html: body
    });
};
