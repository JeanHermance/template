import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parent } from "./Parent";

@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @CreateDateColumn({type: "timestamp" , default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({type: 'date'})
    expires_in: Date;

    @ManyToOne(() => Parent ,(parent) => parent.refreshtokens, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'parent_id'})
    parent: Parent;

}