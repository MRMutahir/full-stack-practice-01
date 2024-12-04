import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import { mainRouter } from "./Routes/index.js";
import { errorMiddleware } from "./middleware/ErrorMiddlewae.js";
import path from "path";
import { fileURLToPath } from "url";
import "./jobs/index.js";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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
    // const html = await ejs.renderFile(
    //   path.join(__dirname, "views", "emails", "wellcome.ejs")
    // );
    // await emailQueue.add(emailQueueName, {
    //   to: "m23629592@gmail.com",
    //   subject: "Welcome to new Look",
    //   html
    // });
    // res.json({ message: "sent email Queue successfully" });
  } catch (error) {
    // console.log('app.get("/send"error', error);
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(`${err.stack}`);
});

app.use("/v1/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorMiddleware);

export { app };
