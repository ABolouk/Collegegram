import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../../user/model/user.id";
import { User } from "../../user/model/user";
import { FollowId } from "../model/follow.id";

@Entity("follow")
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id!: FollowId;

    @Column()
    interactionId!: number;

    @Column()
    followerId!: UserId;

    @Column()
    followingId!: UserId;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}