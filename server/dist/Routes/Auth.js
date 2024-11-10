import { Router } from "express";
import { register } from "../Controller/Auth.js";
const AuthRoutes = Router();
AuthRoutes.post("/register", register);
export { AuthRoutes };
