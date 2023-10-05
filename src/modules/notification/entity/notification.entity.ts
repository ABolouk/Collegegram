import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserEntity } from "../../user/entity/user.entity";
import { PostEntity } from "../../post/entity/post.entity";
import { CommentEntity } from "../../post/comment/entity/comment.entity";
import { UserId } from "../../user/model/user.id";
import { PostId } from "../../post/model/post-id";
import { CommentId } from "../../post/comment/model/comment-id";
import { NotificationId } from "../model/notification-id";
import { NotificationType } from "../model/notification";

@Entity("notifications")
export class NotificationEntity{
    @PrimaryGeneratedColumn()
    id!: NotificationId;

    @Column()
    interactingUserId!: UserId;

    @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
    interactingUser!: UserEntity;

    @Column()
    interactedUserId!: UserId;

    @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
    interactedUser!: UserEntity;

    @Column()
    type!: NotificationType;

    @Column({ nullable: true })
    postId?: PostId;

    @ManyToOne(() => PostEntity, { onDelete: "CASCADE", nullable: true })
    post?: PostEntity;

    @Column({ nullable: true })
    commentId?: CommentId;

    @ManyToOne(() => CommentEntity, { onDelete: "CASCADE", nullable: true })
    comment?: CommentEntity;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}