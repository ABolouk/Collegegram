import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserId} from "../model/user.id";
import {UserEntity} from "../entity/user.entity";

@Entity("close friend")
export class CloseFriendEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    user!: UserEntity;

    @Column()
    closeFriendId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    closeFriend!: UserEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}