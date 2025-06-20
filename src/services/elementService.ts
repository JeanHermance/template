import { AppDataSource } from "../config/database";
import { ElementDto } from "../dto/elementDto";
import { Element } from "../entities/element";
import { Theme } from "../entities/Theme";

export class ElementService {
    private themeRepository = AppDataSource.getRepository(Theme);
    private elementRepository = AppDataSource.getRepository(Element);

    async createElement (elementDto: ElementDto){
        const theme = await this.themeRepository.findOne({where: {id_theme: elementDto.theme_id}});

        if(!theme){
            throw new Error('Theme not found');
        }

        const element = this.elementRepository.create({
            nom_element: elementDto.nom_element,
            description: elementDto.description,
            valeur: elementDto.valeur,
            type_element: elementDto.type_element,
            theme
        });

        await this.elementRepository.save(element);
        return element;

    }

    async getAllTheme(){
        const themes = await this.themeRepository.find();
        return themes;
    }

    async findAllElement(id: number){
        const elements = await this.elementRepository.find({where: {theme: {id_theme: id}}});
        return elements;
    }

    async deleteElement(id: number){
        const element = await this.elementRepository.findOne({where: {id_element: id}});
        if (!element) {
            throw new Error('Element not found');
        }

        await this.elementRepository.delete(id);
        return true;    
    }
}