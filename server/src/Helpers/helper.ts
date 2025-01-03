import { Response } from "express";
import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { fileURLToPath } from "url";
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';

const formateError = (error: ZodError) => {
  const errors: any = {};
  error.errors?.forEach((issue) => {
    errors[issue.path[0]] = issue.message;
  });
  return errors;
};

const emailRenderEjs = async (
  fileName: string,
  payload: any
): Promise<string> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const validPath = path.resolve(__dirname, "..");

  const html: string = await ejs.renderFile(
    validPath + `/views/emails/${fileName}.ejs`,
    payload
  );

  return html;
};

const sendResponse = async (
  res: Response,
  statuscode: number = 200,
  success: Boolean = true,
  message: string = "",
  data: any = null
): Promise<Response> => {
  return res.status(statuscode).json({
    success,
    message,
    data
  });
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

const generateVerifyAccountToken = async (
  email: string
): Promise<string> => {
  const secret = process.env.JWT_SECRET!;

  const token = jwt.sign(email, secret);

  return token;
};


const VerifyAccountToken = async (
  token: string
): Promise<JwtPayload | string> => {
  const secret = process.env.JWT_SECRET as string;


  const verifyToken = jwt.verify(token, secret);

  return verifyToken;
};


const verifyPassword = async (loginPassword: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(loginPassword, hashedPassword);
  return isMatch;
};


const generateJwtToken = async (user: { email: string; id: number }): Promise<string> => {

  const secret = process.env.JWT_SECRET! as string;

  const expiresIn = "1d";

  const payload: JwtPayload = { email: user.email, id: user.id };

  return jwt.sign(payload, secret, { expiresIn });
};



export {
  formateError,
  emailRenderEjs,
  sendResponse,
  hashPassword,
  generateVerifyAccountToken,
  VerifyAccountToken,
  verifyPassword,
  generateJwtToken
};
