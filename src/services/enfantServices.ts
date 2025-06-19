import { AppDataSource } from "../config/database";
import { EnfantDto } from "../dto/enfantDto";
import { Enfant } from "../entities/enfant";
import { Niveau } from "../entities/Niveau";
import { Notification } from "../entities/notification";
import { Parent } from "../entities/Parent";
import { sendPinParent } from "../utils/mailer";


export class EnfantService {
    private enfantRepository = AppDataSource.getRepository(Enfant);
    private userRepository = AppDataSource.getRepository(Parent);
    private niveauRepository = AppDataSource.getRepository(Niveau);
    private notificationRepository = AppDataSource.getRepository(Notification);

    private io: any;

    constructor(io: any){
        this.io = io;
    }



    async createCompteEnfant (enfantDto: EnfantDto , userId: number){
        
        const user = await this.userRepository.findOne({where: {id: userId}})
        if (!user) {
            throw new Error('User not found')
        }

        const niveau = await this.niveauRepository.findOne({where: {id_niveau: enfantDto.niveau_id}})
        if (!niveau) {
            throw new Error('Niveau not found')
        }

        const pin = this.generatePin();

        const enfant  = this.enfantRepository.create({
            firstName: enfantDto.firstName,
            age: enfantDto.age,
            pin: pin,
            parent: user,
            niveau
        });

        const savedEnfant = await this.enfantRepository.save(enfant);

        const notification = this.notificationRepository.create({
            title: 'Compte enfant créé',
            message: `Le compte enfant ${savedEnfant.firstName} a été créé avec succès.le code PIN est :<b>${pin}</b>`,
            parent: user
        })

        await this.notificationRepository.save(notification);

        this.io.to(`user_${userId}`).emit('notification', {
            title: notification.title,
            message: notification.message,
            createdAt: notification.created_at
        });


        await sendPinParent(user.email, savedEnfant.firstName, pin);

        return savedEnfant;


    }

    private generatePin(): string{
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    async findAllEnfantParent(id: number){
        const enfants = await this.enfantRepository.find({where: {parent: {id}}, relations: ['niveau']});
        return enfants;
    }

    async countEnfant(id: number){
        const enfant = await this.enfantRepository.count({where: {parent: {id}}});
        return enfant;
    }
}

