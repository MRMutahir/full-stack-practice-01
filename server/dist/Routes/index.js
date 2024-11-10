// routes/index.js
import { Router } from "express";
import { AuthRoutes } from "./Auth.js";
// import { HealthRoutes } from "./Health.js";
const mainRouter = Router();
mainRouter.use("/auth", AuthRoutes);
export { mainRouter };
