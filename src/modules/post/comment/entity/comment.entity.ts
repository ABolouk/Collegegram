import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostEntity } from "../../entity/post.entity";
import { UserEntity } from "../../../user/entity/user.entity";


@Entity("comments")
export class CommentEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => UserEntity)
  user!: UserEntity

  @ManyToOne(() => PostEntity)
  post!: PostEntity

  @Column()
  content!: string
  
  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}