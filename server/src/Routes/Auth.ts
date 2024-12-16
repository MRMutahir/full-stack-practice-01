import { Router } from "express";
import { checkLogin, login, register, TestForm, verifyAccount } from "../controller/Auth.js";

const AuthRoutes = Router();

AuthRoutes.post("/register", register);

AuthRoutes.post(`/verify-account`, verifyAccount);

AuthRoutes.post('/login', login)

AuthRoutes.post('/check-login', checkLogin)



export { AuthRoutes };
