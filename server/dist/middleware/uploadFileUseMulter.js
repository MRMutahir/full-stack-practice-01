import multer from "multer";
import path from "path";
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
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB file size limit
    fileFilter(req, file, callback) {
        if (!fileTypes.includes(file.mimetype)) {
            return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
        }
        callback(null, true);
    },
});
// Upload File Function
const uploadFile = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Please provide a file to upload.' });
    }
    next();
};
const removeFile = async (filePath) => {
    try {
        const absolutePath = path.join(__dirname, filePath); // Ensure absolute path
        console.log('absolutePath', absolutePath);
        //   if (fs.existsSync(absolutePath)) {
        //     await fs.promises.unlink(absolutePath); // Delete the file
        //     console.log("File deleted successfully");
        //   } else {
        //     console.log("File does not exist");
        //   }
    }
    catch (error) {
        console.error("Error deleting file:", error);
    }
};
export { upload, uploadFile, removeFile };
