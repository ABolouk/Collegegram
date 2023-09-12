import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../../user/model/user.id";
import { User } from "../../user/model/user";

@Entity("follow")
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    intractionId!: number;

    @Column()
    followerId!: UserId;

    @Column()
    followingId!: UserId;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}