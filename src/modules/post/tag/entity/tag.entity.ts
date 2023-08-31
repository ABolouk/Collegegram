import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity("tags")
export class TagEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string

  @Column()
  color!: string

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}