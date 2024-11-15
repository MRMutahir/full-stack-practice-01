import { Request, Response, NextFunction } from "express";
import { registerValidator, verifyAccountSchema } from "../Validator/Auth.js";
import { prisma } from "../config/database.js";
import { emailRenderEjs, generateVerifyAccountToken, hashPassword, sendResponse, VerifyAccountToken } from "../Helpers/helper.js";
import { emailQueue, emailQueueName } from "../jobs/EmailsJob.js";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const body = req.body;

    const validateBody = registerValidator.parse(body);
    const { name, email, password } = validateBody;

    let user = await prisma.user.findUnique({
      where: { email }
    });
    if (user) {
      return sendResponse(
        res,
        409,
        false,
        "User already exists with this email."
      );
    }

    const passwordHash = await hashPassword(password);
    const token = await generateVerifyAccountToken(email)

    const payload = {
      name,
      email,
      password: passwordHash,
      email_verify_token: token,
      token_send_at: new Date().toISOString()
    };


    const url = `${process.env.Account_Verify_Url_Frontend}/verify-account?email=${encodeURIComponent(payload.email)}&token=${encodeURIComponent(token)}`;


    const html = await emailRenderEjs("account-verify", {
      name: payload.name,
      url
    });

    const newUser = await prisma.user.create({ data: payload });


    if (newUser) {
      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Please verify your email",
        html
      });

      return sendResponse(
        res,
        200,
        true,
        "User created successfully. Please verify your email."
      );
    }
  } catch (error) {
    next(error);
  }
};

const verifyAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, token } = req.query;

    const validatedData = verifyAccountSchema.parse({ email, token });

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return sendResponse(res, 404, true, "User not found")
    }

    if (user.isVerified) {
      return sendResponse(res, 404, true, "User allready isVerified")
    }

    if (user.email_verify_token !== validatedData.token) {
      return sendResponse(res, 400, true, "Invalid or mismatched token")
    }

    const verifyToken = await VerifyAccountToken(validatedData.token);

    await prisma.user.update({
      where: { email: validatedData.email },
      data: {
        isVerified: true,
        email_verify_token: null,
      },
    });

    return sendResponse(res, 400, true, "Account verified successfully", verifyToken)

  } catch (error) {
    next(error);
  }
};


export { register, verifyAccount };