import { Column, CreateDateColumn, Entity, Unique, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("tags")
@Unique(['title'])
export class TagEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  color!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}