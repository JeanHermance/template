import { Request, Response } from "express";
import { AuthentificateRequest } from "../middlewares/authMiddleware";
import { DevinetteService } from "../services/devinettteService";
import { DevinetteDto } from "../dto/devinetteDto";

const devinetteService = new DevinetteService();

export const createDevinette = async  (req: AuthentificateRequest , res: Response ) =>  {
    try {
        const devinateDto = Object.assign(new DevinetteDto() ,req.body);

        if(!req.userId){
            res.status(401).send('Unauthorized');
        }else{
            const devinette = await devinetteService.createDevinette(devinateDto , req.userId);
            res.status(201).send(devinette)
        }
    }catch(error: any){
        res.status(400).send(error.message);
    }   
}

export const getAllDevinettes = async (req: Request , res: Response ) => {
    try {
        const devinettes = await devinetteService.findAllDevinette();
        
        res.status(200).send(devinettes);
        console.log(devinettes);

    } catch (error: any) {
        res.status(400).send(error.message);

    }
}

export const getDevinetteById = async (req: AuthentificateRequest , res: Response ) => {
    try {
        const {id} = req.params;

        const devinette = await devinetteService.findOneDevinette(Number(id));

        res.status(200).send(devinette);

    } catch (error: any) {
        res.status(400).send(error.message);
    
    }


}

export const updateDevinette = async (req: AuthentificateRequest , res: Response ) => {
    try {
        const {id} = req.params;
        const devinette =  await devinetteService.findOneDevinette(Number(id));
    }
    catch(error: any) {
        res.status(400).send(error.message);
    }
    
}

