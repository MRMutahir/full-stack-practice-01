import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database.js";
import { checkReqFile, sendResponse } from "../Helpers/helper.js";
import { PostValidator } from "../Validator/Post.js";

// Controller function for registering a post
const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body;
    console.log('body', body)
    sendResponse(res, 200, true, "SALAM", { data: "" })
};

// Export the controller
const postController = {
    register,
};

export { postController };
