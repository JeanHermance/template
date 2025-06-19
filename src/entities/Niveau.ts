import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToMany } from "typeorm";
import { Theme } from "./Theme"; // Assurez-vous que le chemin est correct
import { Enfant } from "./enfant";

@Entity()
export class Niveau {
    @PrimaryGeneratedColumn()
    id_niveau: number;

    @OneToMany(() => Theme, (theme) => theme.niveau)
    themes: Theme[];

    @Column()
    nom_niveau: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Enfant, (enfant) => enfant.niveau)
    enfants: Enfant[];

}
