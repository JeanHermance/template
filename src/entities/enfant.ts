import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parent } from "./Parent";
import { Niveau } from "./Niveau";

@Entity()
export class Enfant{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    age:number;

    @Column({nullable: true})
    pin:string;

    @ManyToOne(() => Parent , (parent) => parent.enfants)
    @JoinColumn({name: 'user_id'})
    user:Parent;

    @ManyToOne(() => Niveau , niveau => niveau.enfants)
    @JoinColumn({name: 'niveau_id'})
    niveau:Niveau;
}