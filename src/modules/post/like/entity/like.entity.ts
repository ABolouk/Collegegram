import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserEntity} from "../../../user/entity/user.entity";
import {PostId} from "../../model/post-id";
import {PostEntity} from "../../entity/post.entity";
import {UserId} from "../../../user/model/user.id";

@Entity("likes")
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userId!: UserId

    @ManyToOne(() => UserEntity)
    user!: UserEntity

    @Column()
    postId!: PostId

    @ManyToOne(() => PostEntity)
    post!: PostEntity

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}