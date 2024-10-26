import express, { Application, Request, Response, NextFunction } from "express";

import "dotenv/config.js"

const app: Application = express()


const PORT = process.env.PORT || 1114

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("SALAM i am working")
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `)
})