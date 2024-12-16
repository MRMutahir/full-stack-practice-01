import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const authHeader = req.headers.authorization;
        // console.log('authHeader', authHeader);

        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: Missing Authorization Header" });
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET as string;

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error("Token verification error", err);
                return res.status(401).json({ message: "Unauthorized: Invalid Token" });
            }



            req.user = decoded as AuthUser;
            next();
        });
    } catch (error) {
        console.error('Error in authMiddleware', error);
        next(error);
    }
};



export { authMiddleware }