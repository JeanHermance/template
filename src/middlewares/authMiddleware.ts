import jwt from "jsonwebtoken";
import { NextFunction, Response , Request} from "express";
import { RoleEnum } from "../enums/roleEnum";

export interface AuthentificateRequest extends Request{
    userId?: number;
    role?: RoleEnum;
}

export const authentificateToken = (
    req: AuthentificateRequest,
    res: Response,
    next: NextFunction
) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if(!token) {
        res.status(401).json({message: 'Unauthorized'});
    }else{
        try {
            const secret = process.env.ACCESS_TOKEN_SECRET;
            if (!secret) {
                throw new Error('Secret is not defined')
            }
            const decoded = jwt.verify(token, secret) as {id: number, role: RoleEnum};
            req.userId = decoded.id;
            req.role = decoded.role;

            next();
        } catch (error) {
            res.status(403).json({message: 'Forbidden'});
        }
    }
}