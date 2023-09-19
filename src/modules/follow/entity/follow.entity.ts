import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserId} from "../../user/model/user.id";
import {User} from "../../user/model/user";
import {FollowId} from "../model/follow.id";
import {UserEntity} from "../../user/entity/user.entity";
import {UserInteractionEntity} from "../../user-interaction/entity/user-interaction";

@Entity("follow")
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id!: FollowId;

    @ManyToOne(() => UserInteractionEntity, {onDelete: "CASCADE"})
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