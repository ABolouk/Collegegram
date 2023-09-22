import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserId} from "../../user/model/user.id";
import {FollowReqId} from "../model/follow.req.id";
import {FollowReqStatus} from "../model/follow.req.status";
import {UserEntity} from "../../user/entity/user.entity";
import {UserInteractionEntity} from "../../user-interaction/entity/user-interaction";

@Entity("follow requset")
export class FollowRequestEntity {
    @PrimaryGeneratedColumn()
    id!: FollowReqId;

    @Column()
    interactionId!: number;

    @ManyToOne(() => UserInteractionEntity, {onDelete: "CASCADE"})
    interaction!: UserInteractionEntity;


    @Column()
    followerId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    follower!: UserEntity;

    @Column()
    followingId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    following!: UserEntity;

    @Column()
    status!: FollowReqStatus.status;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}