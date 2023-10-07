import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserId} from "../../user/model/user.id";
import {UserEntity} from "../../user/entity/user.entity";
import {PostId} from "../../post/model/post-id";
import {PostEntity} from "../../post/entity/post.entity";
import {BookMarkId} from "../model/book-mark-id";

@Entity("bookmark")
export class BookmarkEntity {

    @PrimaryGeneratedColumn()
    id !: BookMarkId

    @Column()
    userId !: UserId

    @ManyToOne(() => UserEntity)
    user!: UserEntity

    @Column()
    postId !: PostId

    @ManyToOne(() => PostEntity)
    post!: PostEntity

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}