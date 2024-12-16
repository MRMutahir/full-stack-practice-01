import { Router } from "express";
import { postController } from "../controller/Post.js";
import { upload, uploadFile } from "../middleware/uploadFileUseMulter.js";
const PostRoutes = Router();
PostRoutes.post("/register", upload.single("file"), uploadFile, postController.register);
PostRoutes.get("/get/all", postController.getPost);
PostRoutes.get("/get/:id", postController.getPostById);
PostRoutes.put("/update/:id", postController.updatePostById);
export { PostRoutes };
