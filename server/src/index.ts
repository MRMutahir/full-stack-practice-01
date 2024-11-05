import express, { Application, Request, Response, NextFunction } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs, { name } from "ejs";
import { sendEmail } from "./config/mail.js";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const url = import.meta.url;

const __dirname = path.dirname(fileURLToPath(url));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

const PORT = process.env.PORT || 1114;

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: "server start  successfully" });
  } catch (error) {
    next(error);
  }
});
app.get("/send", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const html = await ejs.renderFile(
      path.join(__dirname, "views", "emails", "wellcome.ejs"),
      {
        name: "Anus Raza"
      }
    );

    const responseEmail: any = await sendEmail(
      "https://temp-mail.org/",
      "testing email setup",
      html
    );
    // console.log("responseEmail", responseEmail);
    if (responseEmail) {
      res.json({ message: "Email sent successfully" });
    }
  } catch (error) {
    // console.log('app.get("/send"error', error)
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(`${err.stack}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
