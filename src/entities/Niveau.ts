import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Enfant } from "./enfant";

@Entity()
export class Niveau {
    @PrimaryGeneratedColumn()
    id_niveau: number;

    @Column()
    nom_niveau: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Enfant, (enfant) => enfant.niveau)
    enfants: Enfant[];
}
