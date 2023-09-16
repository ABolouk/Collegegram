import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../../user/model/user.id";
import { FollowReqId } from "../model/follow.req.id";
import { FollowReqStatus } from "../model/follow.req.status";

@Entity("follow requset")
export class FollowRequestEntity {
    @PrimaryGeneratedColumn()
    id!: FollowReqId;

    @Column()
    interactionId!: number;

    @Column()
    followerId!: UserId;

    @Column()
    followingId!: UserId;

    @Column()
    status!: FollowReqStatus.status;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}