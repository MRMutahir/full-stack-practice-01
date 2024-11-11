import { Router } from "express";
import { register } from "../controller/Auth.js";



const AuthRoutes = Router()

AuthRoutes.post("/register", register)


export { AuthRoutes }