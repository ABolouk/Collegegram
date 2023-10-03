import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserId } from "../../user/model/user.id";
import { UserEntity } from "../../user/entity/user.entity";
import { PostEntity } from "../../post/entity/post.entity";
import { PostId } from "../../post/model/post-id";
import { NotificationType } from "../model/notification";

@Entity("notifications")
export class NotificationEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    interactingUserId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    interactingUser!: UserEntity;

    @Column()
    interactedUserId!: UserId;

    @ManyToOne(() => UserEntity, {onDelete: "CASCADE"})
    interactedUser!: UserEntity;

    @Column()
    type!: NotificationType;

    @Column({ nullable: true })
    postId?: PostId;

    @ManyToOne(() => PostEntity, {onDelete: "CASCADE", nullable: true})
    post?: PostEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}