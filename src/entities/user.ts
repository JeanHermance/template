import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RefreshToken } from "./refreshToken";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;


    @Column({default: true})
    isActive: boolean


    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({type: "timestamp" , default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp" , default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @OneToMany(() => RefreshToken, (refreshtoken) => refreshtoken.user)
    refreshtokens: RefreshToken[];
}

