import { Router } from "express";
import { login, register, verifyAccount } from "../controller/Auth.js";
const AuthRoutes = Router();
AuthRoutes.post("/register", register);
AuthRoutes.post(`/verify-account`, verifyAccount);
AuthRoutes.post('/login', login);
export { AuthRoutes };
