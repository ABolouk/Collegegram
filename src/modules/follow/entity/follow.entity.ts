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
import {User} from "../../user/model/user";
import {FollowId} from "../model/follow.id";
import {UserEntity} from "../../user/entity/user.entity";

@Entity("follow")
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id!: FollowId;

    @Column()
    followerId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    follower!: UserEntity;

    @Column()
    followingId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    following!: UserEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}