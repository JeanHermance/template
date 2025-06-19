import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
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

    @ManyToOne(() => User , (user) => user.enfants)
    @JoinColumn({name: 'user_id'})
    user:User;

    @ManyToOne(() => Niveau , niveau => niveau.enfants)
    @JoinColumn({name: 'niveau_id'})
    niveau:Niveau;
}