import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserId } from "../../user/model/user.id";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("block")
export class BlockEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: UserId;
    
  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column()
  blockedUserId!: UserId;

  @ManyToOne(() => UserEntity)
  blockedUser!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}