import { AppDataSource } from "../config/database";
import { MaquetteDto } from "../dto/maquetteDto";
import { Enfant } from "../entities/enfant";
import { Maquette } from "../entities/maquette";
import { Niveau } from "../entities/Niveau";
import { Theme } from "../entities/Theme";

export class MaquetteService {
    private maquetteRepository = AppDataSource.getRepository(Maquette);
    private enfantRepository = AppDataSource.getRepository(Enfant);
    private themeRepository = AppDataSource.getRepository(Theme);
    private niveauRepository = AppDataSource.getRepository(Niveau);



    async createMaquete(maquetteDto: MaquetteDto , ){
        const enfant = await this.enfantRepository.findOne({where: {id: maquetteDto.enfantId}});
        if (!enfant) {
            throw new Error('Enfant not found');
        }

        const theme = await this.themeRepository.findOne({where: {id_theme: maquetteDto.themeId}});
        if (!theme) {
            throw new Error('Theme not found');
        }

        const maquette = this.maquetteRepository.create({
            title: maquetteDto.title,
            image: maquetteDto.image,
            contenue: maquetteDto.contenue,
            enfant,
            theme
        });

        await this.maquetteRepository.save(maquette);
        return maquette;

    }


    async findAllMaquette(){
        const maquettes = await this.maquetteRepository.find({relations: ['enfant', 'theme']});
        return maquettes;
    }

    async getOneMaquette(id: number){
        const maquette = await this.maquetteRepository.findOne({where: {id}, relations: ['enfant', 'theme']});
        if (!maquette) {
            throw new Error('Maquette not found');
        }
        return maquette;
    
    }


    async updateMaquette(id: number , maquetteDto: MaquetteDto){
        const maquette = await this.maquetteRepository.findOne({where: {id}, relations: ['enfant', 'theme']});
        if (!maquette) {
            throw new Error('Maquette not found');
        }

        Object.assign(maquette, maquetteDto);
        await this.maquetteRepository.save(maquette);

    }
    
    
}