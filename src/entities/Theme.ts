import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Parent } from "./Parent";
import { Niveau } from "./Niveau";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id_theme: number;

  @ManyToOne(() => Parent, (parent) => parent.themes, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "id_parent" })
  parent: Parent;

  @ManyToOne(() => Niveau, (niveau) => niveau.themes, { onDelete: "SET NULL" })
  @JoinColumn({ name: "id_niveau" })
  niveau: Niveau;

  @Column()
  nom_theme: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;
}
