import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RefreshToken } from "./refreshToken";
import { Enfant } from "./enfant";
import { Notification } from "./notification";

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

    @OneToMany(() => Enfant , (enfant) => enfant.user)
    enfants: Enfant;

    @OneToMany(() => Notification , (notification) => notification.user)
    notifications: Notification[];

}

