import ejs from "ejs";
import path from "path";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const formateError = (error) => {
    const errors = {};
    error.errors?.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
    });
    return errors;
};
const emailRenderEjs = async (fileName, payload) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const validPath = path.resolve(__dirname, "..");
    const html = await ejs.renderFile(validPath + `/views/emails/${fileName}.ejs`, payload);
    return html;
};
const sendResponse = async (res, statuscode = 200, success = true, message = "", data = null) => {
    return res.status(statuscode).json({
        success,
        message,
        data
    });
};
const hashPassword = async (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
};
const generateVerifyAccountToken = async (email) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(email, secret);
    return token;
};
const VerifyAccountToken = async (token) => {
    const secret = process.env.JWT_SECRET;
    const verifyToken = jwt.verify(token, secret);
    return verifyToken;
};
const verifyPassword = async (loginPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(loginPassword, hashedPassword);
    return isMatch;
};
const generateJwtToken = async (email) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = "1d";
    const payload = { email };
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
};
const checkReqFile = async (file) => {
    console.log('file', file);
};
export { formateError, emailRenderEjs, sendResponse, hashPassword, generateVerifyAccountToken, VerifyAccountToken, verifyPassword, generateJwtToken, checkReqFile };
