import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RefreshToken } from "./refreshToken";
import { Theme } from "./Theme";
import { Enfant } from "./enfant";
import { Devinette } from "./devinette";

@Entity()
export class Parent {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Theme, (theme) => theme.parent)
    themes: Theme[];

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

    @OneToMany(() => RefreshToken, (refreshtoken) => refreshtoken.parent)
    refreshtokens: RefreshToken[];

    @OneToMany(() => Enfant, (enfant) => enfant.parent)
    enfants: Enfant[];

    @OneToMany(() => Enfant, (enfant) => enfant.parent)
    notifications: Enfant[];

    @OneToMany(() => Devinette, (devinette) => devinette.parent)
    devinettes: Enfant[];
}

