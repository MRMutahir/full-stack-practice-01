import { Router } from "express";
import { register, verifyAccount } from "../controller/Auth.js";

const AuthRoutes = Router();

AuthRoutes.post("/register", register);

AuthRoutes.post(`/verify-account`, verifyAccount);

export { AuthRoutes };
