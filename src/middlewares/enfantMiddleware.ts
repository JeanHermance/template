import { Request, Response, NextFunction } from "express";

export const authEnfant = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !(req.session as any).enfant) {
    res.status(401).json({ message: "Accès refusé. Enfant non authentifié." });
  }

  next();
};
