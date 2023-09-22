import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserId } from "../../user/model/user.id";
import { UserEntity } from "../../user/entity/user.entity";

Entity("block")
export class BlockEntity{
  @PrimaryGeneratedColumn()
  id!: UserId;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  userId!: string

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  blockedUserId!: string

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}