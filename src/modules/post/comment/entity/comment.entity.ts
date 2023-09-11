import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostEntity } from "../../entity/post.entity";
import { UserEntity } from "../../../user/entity/user.entity";
import { PostId } from "../../model/post-id";
import { UserId } from "../../../user/model/user.id";


@Entity("comments")
export class CommentEntity {

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

  @Column()
  content!: string
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}