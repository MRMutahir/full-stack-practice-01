import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD
  }
});

export const sendEmail = async (to: string, subject: string, body: string) => {

  // console.log('to', to)
  // console.log('subject', subject)
  // console.log('body', body)
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      html: body
    });
  } catch (error) {
    // console.log('sendEmail error', error)
  }
};
