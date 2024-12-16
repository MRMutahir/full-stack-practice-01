import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import { mainRouter } from "./Routes/index.js";
import { errorMiddleware } from "./middleware/ErrorMiddlewae.js";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import "./jobs/index.js";

const app: Application = express();

// Use built-in Express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const url = import.meta.url;
const __dirname = path.dirname(fileURLToPath(url));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

const PORT = process.env.PORT || 1114;

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: "Server started successfully" });
  } catch (error) {
    next(error);
  }
});


// Main router
app.use(express.static("uploads/images/"));

app.use("/v1/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error-handling middleware
app.use(errorMiddleware);
export { app };
