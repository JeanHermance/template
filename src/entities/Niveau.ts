import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Niveau {
    @PrimaryGeneratedColumn()
    id_niveau: number;

    @Column()
    nom_niveau: string;

    @Column({ nullable: true })
    description: string;
}
