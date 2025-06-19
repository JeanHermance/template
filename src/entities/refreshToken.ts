import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

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

    @ManyToOne(() => User ,(user) => user.refreshtokens, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

}