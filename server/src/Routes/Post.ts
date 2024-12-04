import { Router } from "express";
import { postController } from "../controller/Post.js";

const PostRoutes = Router();

PostRoutes.post("/register", postController.register);



export { PostRoutes };
