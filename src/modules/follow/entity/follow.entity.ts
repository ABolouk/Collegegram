import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { UserId } from "../../user/model/user.id";
import { User } from "../../user/model/user";
import { FollowId } from "../model/follow.id";
import {UserEntity} from "../../user/entity/user.entity";

@Entity("follow")
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id!: FollowId;

    @Column()
    interactionId!: number;

    @ManyToOne(() => UserEntity)
    followerId!: UserId;

    @ManyToOne(() => UserEntity)
    followingId!: UserId;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}