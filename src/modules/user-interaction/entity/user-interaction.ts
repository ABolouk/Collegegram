import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("userInteraction")
@Unique(["userId1", "userId2"])
// @Unique(["userId2", "userId1"])
export class UserInteractionEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToMany(() => UserEntity)
  @JoinTable()
  @Column({name: "userId1"})
  userId1!: string

  @ManyToMany(() => UserEntity)
  @JoinTable()
  @Column({ name: "userId2" })
  userId2!: string

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}