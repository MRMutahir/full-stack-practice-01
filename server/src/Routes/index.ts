// routes/index.js
import { Router } from "express";
import { AuthRoutes } from "./Auth.js";
import { sendEmail } from "../config/mail.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
// import { HealthRoutes } from "./Health.js";

const mainRouter = Router();

mainRouter.use("/auth", AuthRoutes);
mainRouter.post("/send-email", async (req, res, next) => {
  const { to, subject, body } = req.body;
  await sendEmail(to, subject, body);
  res.send("Email send");
});
mainRouter.get("/protected-route", authMiddleware, (req, res) => {
  const user = req.user
  // console.log('user', user)
  res.json({ message: "You have access to this protected route!", data: user || "SALAM" });
});
export { mainRouter };
