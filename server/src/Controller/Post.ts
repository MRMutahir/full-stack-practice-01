import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database.js";
import { sendResponse } from "../Helpers/helper.js";
import { PostValidator } from "../Validator/Post.js";
import { removeFile } from "../middleware/uploadFileUseMulter.js";

// Controller function for registering a post
const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const file = req.file;
        const validatedData = PostValidator.parse(body)
        const user = req?.user?.id!

        await prisma.pOST_DATA.create({
            data: {
                ...validatedData,
                userId: user,
                expire_at: new Date(),
                image: file?.filename!
            }
        })

        sendResponse(res, 200, true, "Post created successfully")

    } catch (error) {
        next(error)
    }
};

const getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req?.user?.id!;

        const posts = await prisma.pOST_DATA.findMany({
            where: { userId },
        });

        if (!posts || posts.length === 0) {
            sendResponse(res, 404, false, "No posts found for this user");
        }

        sendResponse(res, 200, true, "Posts retrieved successfully", posts);
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            sendResponse(res, 400, false, "Invalid post ID");
        }

        const post = await prisma.pOST_DATA.findUnique({
            where: { id },
        });

        if (!post) {
            sendResponse(res, 404, false, "Post not found");
        }

        sendResponse(res, 200, true, "Post retrieved successfully", post);
    } catch (error) {
        next(error);
    }
};

const updatePostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        // console.log('id', id)

        // const file = req?.file;
        // if (file) {
        //     console.log('file', file)
        // }

        // if (isNaN(id)) {
        //     sendResponse(res, 400, false, "Invalid post ID");
        // }

        // const post = await prisma.pOST_DATA.findUnique({
        //     where: { id },
        // });

        // if (!post) {
        //     sendResponse(res, 404, false, "Post not found");
        // }

        sendResponse(res, 200, true, "Post retrieved successfully");

    } catch (error) {
        next(error);
    }
};



const postController = {
    register,
    getPost,
    getPostById,
    updatePostById
};

export { postController };
