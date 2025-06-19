import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parent } from "./Parent";

@Entity()
export class Notification{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column()
    message: string;

    @Column({default: false})
    read: boolean;


    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @ManyToOne(() => Parent , (parent) => parent.notifications)
    @JoinColumn({name: "user_id"})
    parent: Parent;
}