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

export const loginEnfant = async (req: Request, res: Response) => {
    const {firstName, pin} = req.body;
    const io = req.app.get("io");
    const enfantService = new EnfantService(io);
    try {
        const enfant = await enfantService.login(firstName, pin);
        (req.session as any) = enfant;

        res.status(200).json(enfant);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
} 

export const getProfilEnfant = async (req: Request, res: Response) => {
    const enfant = (req.session as any).enfant;

    if (!enfant) {
        res.status(401).json({ message: "Enfant non authentifié" });
    }

    res.status(200).json({
        message: "Profil de l'enfant connecté",
        enfant,
    });
};

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

export const logoutEnfant = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }

        res.json({ message: "Déconnexion réussie" });
    });
};