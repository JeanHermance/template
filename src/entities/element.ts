import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TypeElementEnum } from "../enums/typeElementEnum";
import { Theme } from "./Theme";

@Entity()
export class Element{
    @PrimaryGeneratedColumn()
    id_element:number;

    @Column({type: 'enum' , enum: TypeElementEnum})
    type_element: TypeElementEnum;

    @Column()
    nom_element:string;

    @Column({nullable: true})
    description:string;

    @Column()
    valeur:string;

    @ManyToOne(() => Theme , theme => theme.elements)
    @JoinColumn({name: 'theme_id'})
    theme: Theme;
}
