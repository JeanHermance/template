import { AppDataSource } from "../config/database";
import { DevinetteDto } from "../dto/devinetteDto";
import { Devinette } from "../entities/devinette";
import { Niveau } from "../entities/Niveau";
import { Parent } from "../entities/Parent";

export class DevinetteService {
    private devinetteRepository = AppDataSource.getRepository(Devinette);
    private niveauRepository = AppDataSource.getRepository(Niveau);
    private userRepository = AppDataSource.getRepository(Parent);

    async createDevinette(devinetteDto: DevinetteDto , userId: number) {
        const niveau = await this.niveauRepository.findOne({ where: { id_niveau: devinetteDto.niveau_id } });
        if (!niveau) {
            throw new Error('Niveau not found');
        }
        const parent = await this.userRepository.findOne({ where: { id: userId } });
        if (!parent) {
            throw new Error('Parent not found');
        }
        
        const newDevinette = this.devinetteRepository.create({
            question: devinetteDto.question,
            reponse: devinetteDto.reponse,
            points: devinetteDto.points,
            indice: devinetteDto.indice,
            image: devinetteDto.image,
            category: devinetteDto.category,
            niveau,
            parent
        });

        await this.devinetteRepository.save(newDevinette);
        return newDevinette;
    }


    async findAllDevinette() {
        console.log('reussi');
        return await this.devinetteRepository.find({
            relations: ['niveau', 'parent']
        });
    }

    async findOneDevinette(id: number) {
        const devinette = await this.devinetteRepository.findOne({
            where: { id },
            relations: ['niveau', 'parent']
        });

        if (!devinette) {
            throw new Error('Devinette not found');
        }

        return devinette;
    }

    async updateDevinette(id: number, devinetteDto: DevinetteDto) {
        const devinette = await this.devinetteRepository.findOne({ where: { id } });
        if (!devinette) {
            throw new Error('Devinette not found');
        }

        Object.assign(devinette, devinetteDto);
        await this.devinetteRepository.save(devinette);
        return devinette;
    }
}
