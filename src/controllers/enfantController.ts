import { Request, Response } from "express";
import { AuthentificateRequest } from "../middlewares/authMiddleware";
import { EnfantService } from "../services/enfantServices";
import { EnfantDto } from "../dto/enfantDto";
import { validate } from "class-validator";

// const enfantService = new EnfantService();
export const createCompteEnfant = async (req: AuthentificateRequest, res: Response) => {
    try {
        const enfantDto = Object.assign(new EnfantDto(), req.body);
        
        const error = await validate(enfantDto);
        if (error.length > 0) {
            res.status(400).json(error);
        } else {

            const io = req.app.get("io");
            const enfantService = new EnfantService(io);

            if (!req.userId) {
                res.status(401).json({message: 'Unauthorized'});
            }else{
                const enfant = await enfantService.createCompteEnfant(enfantDto, req.userId);
                res.status(201).json(enfant);
            }
        }
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const findAllEnfantParent = async (req: AuthentificateRequest, res: Response) => {
    try {
        if (!req.userId) {
            res.status(401).json({message: 'Unauthorized'});
        }else{
            const io = req.app.get("io");
            const enfantService = new EnfantService(io);
            const enfants = await enfantService.findAllEnfantParent(+req.userId);
            res.status(200).json(enfants);
        }
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}

export const countEnfant = async (req: AuthentificateRequest, res: Response) => {
    try {
        if (!req.userId) {
            res.status(401).json({message: 'Unauthorized'});
        }else{
            const io = req.app.get("io");
            const enfantService = new EnfantService(io);
            const enfant = await enfantService.countEnfant(+req.userId);
            res.status(200).json(enfant);

        }
    }catch(error: any){
        res.status(400).json({message: error.message});
    }
}