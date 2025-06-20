import { Request, Response } from "express";
import { MaquetteService } from "../services/maquetteService";

const maquetteService = new MaquetteService();

export const getMaquettes = async (req: Request , res: Response) => {
    try {
        const maquettes = await maquetteService.findAllMaquette();
        res.json(maquettes);
    } catch (error: any) {
        res.status(404).json({ error: error.message });

    }

}

export const getMaquetteById = async (req: Request , res: Response) => {
    try {
        const maquetteDto = Object.assign({}, req.body);
        const maquette = await maquetteService.getOneMaquette(+req.params.id);
        res.json(maquette); 
    }catch(error: any){
        res.status(404).json({ error: error.message });
    }
}

export const createMaquette = async (req: Request , res: Response) => {
    try {
        const  maquetteDto = Object.assign({}, req.body);
        const maquette = await maquetteService.createMaquete(maquetteDto);
        res.status(201).json(maquette);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}


export const updateMaquette = async (req: Request , res: Response) => {
    try {
        const maquetteDto = Object.assign({}, req.body);
        await maquetteService.updateMaquette(+req.params.id, maquetteDto);
        res.status(200).json({ message: 'Maquette updated successfully' }); 
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}