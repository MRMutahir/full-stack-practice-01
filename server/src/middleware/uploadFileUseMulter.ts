import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";


// Allowed File Types
const fileTypes = ["image/jpg", "image/jpeg", "image/png"];

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: "uploads/images/",
    filename(req, file, callback) {
        const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    },
});

// Multer Upload Middleware
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        if (!fileTypes.includes(file.mimetype)) {
            return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
        }
        callback(null, true);
    },
});

// Upload File Function
const uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.file) {
        return res.status(400).json({ error: 'Please provide a file to upload.' });
    }
    next();
};
const UPLOADS_BASE_DIR = path.resolve(process.cwd(), "uploads/images");

const removeFile = async (filePath: string): Promise<void> => {
    try {
        const absolutePath = path.join(UPLOADS_BASE_DIR, filePath);
        // console.log('absolutePath', absolutePath)
        if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            console.log("File deleted successfully");
        } else {
            console.log("File does not exist");
        }
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};




export { upload, uploadFile, removeFile };
