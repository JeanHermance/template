import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEnum } from "../enums/categoryEnum";
import { Parent } from "./Parent";
import { Niveau } from "./Niveau";

@Entity()
export class Devinette{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum' , enum: CategoryEnum})
    category: CategoryEnum;

    @Column()
    question: string;

    @Column({type: 'json'})
    reponse: any;

    @Column({nullable: true})
    points: number;


    @Column({nullable: true})
    indice: string;

    @Column({nullable: true})
    image: string;

    @ManyToOne(() => Parent , (parent) => parent.devinettes , {nullable: true})
    @JoinColumn({name: 'parent_id'})
    parent: Parent;

    @ManyToOne(() => Niveau , (niveau) => niveau.devinettes)
    @JoinColumn({name: 'niveau_id'})
    niveau: Niveau;

    @CreateDateColumn({type: 'timestamp' , default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
}

