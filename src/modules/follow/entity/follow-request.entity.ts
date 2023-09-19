import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserId} from "../../user/model/user.id";
import {FollowReqId} from "../model/follow.req.id";
import {FollowReqStatus} from "../model/follow.req.status";
import {UserEntity} from "../../user/entity/user.entity";
import {UserInteractionEntity} from "../../user-interaction/entity/user-interaction";

@Entity("follow requset")
export class FollowRequestEntity {
    @PrimaryGeneratedColumn()
    id!: FollowReqId;

    @ManyToOne(() => UserInteractionEntity, {onDelete: "CASCADE"})
    interactionId!: number;

    @ManyToOne(() => UserEntity)
    followerId!: UserId;

    @ManyToOne(() => UserEntity)
    followingId!: UserId;

    @Column()
    status!: FollowReqStatus.status;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}