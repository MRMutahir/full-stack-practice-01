// routes/index.js
import { Router } from "express";
import { AuthRoutes } from "./Auth.js";
import { sendEmail } from "../config/mail.js";
// import { HealthRoutes } from "./Health.js";
const mainRouter = Router();
mainRouter.use("/auth", AuthRoutes);
mainRouter.post("/send-email", async (req, res, next) => {
    const { to, subject, body } = req.body;
    await sendEmail(to, subject, body);
    res.send("Email send");
});
export { mainRouter };
