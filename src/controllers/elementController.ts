import { Request, Response } from "express";
import { ElementService } from "../services/elementService";
import { ElementDto } from "../dto/elementDto";

const elementService = new ElementService()

export const createElement = async (req: Request , res: Response) => {
    try {
        console.log(req.file);
        const {nom_element , description  , type_element , theme_id} = req.body;

        let valeur = req.body.valeur;

        if (type_element === "image") {
            if (!req.file) {
                res.status(400).json({message: "Image is required"});
            }
            console.log(req.file);
            valeur = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
        }

        const elementDto: ElementDto = {
            nom_element,
            description,
            valeur,
            type_element,
            theme_id
        }
        
        const element = await elementService.createElement(elementDto)
        res.status(201).json(element);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const getAllTheme = async (req: Request , res: Response) => {
    try {
        const themes = await elementService.getAllTheme()
        res.status(200).json(themes);
    }catch(error: any){
        res.status(400).json({message: error.message})
    }
}

export const getElements = async (req: Request , res: Response) => {
    try {
        const id_theme = +req.params.id;
        console.log(id_theme);
        const elements = await elementService.findAllElement(id_theme)
        res.status(200).json(elements);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}


export const deleteElement = async (req: Request , res: Response) => {
    try {
        const id_element = +req.params.id;
        console.log(id_element);
        const element = await elementService.deleteElement(id_element)
        res.status(200).json(element);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}