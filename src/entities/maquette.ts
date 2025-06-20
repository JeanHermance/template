import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Enfant } from "./enfant";
import { Theme } from "./Theme";

@Entity()
export class Maquette{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'json'})
    contenue: any;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;


    @ManyToOne(() => Enfant , (enfant)=> enfant.maquettes)
    @JoinColumn({name: 'enfantId'})
    enfant: Enfant;


    @ManyToOne(() => Theme , (theme)=> theme.maquettes)
    @JoinColumn({name: 'themeId'})
    theme: Theme;
}

