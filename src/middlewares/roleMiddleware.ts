import { NextFunction, Response } from "express";
import { RoleEnum } from "../enums/roleEnum";
import { AuthentificateRequest } from "./authMiddleware";

export const authorizeRole = (...allRoles: RoleEnum[]) => {
    return (req: AuthentificateRequest, res: Response, next: NextFunction) => {
        if (!req.role || !allRoles.includes(req.role)) {
            res.status(403).json({ message: "Forbidden" });
        }
        next();
    }

}