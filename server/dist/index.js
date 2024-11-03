import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const url = import.meta.url;
const __dirname = path.dirname(fileURLToPath(url));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
const PORT = process.env.PORT || 1114;
app.get("/", (req, res, next) => {
    // res.send("SALAM")
    res.render("wellcome"); // Ensure that this file exists in the views folder
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`${err.stack}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
