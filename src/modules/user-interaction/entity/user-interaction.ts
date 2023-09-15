import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("userInteraction")
@Unique('unique1 interaction', ["userId1", "userId2"])
@Unique('unique2 interaction', ["userId2", "userId1"])
export class UserInteractionEntity {
  @PrimaryGeneratedColumn()
  id!: number 

  @ManyToMany(() => UserEntity)
  @JoinTable()
  userId1!: string

  @ManyToMany(() => UserEntity)
  @JoinTable()
  userId2!: string

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}