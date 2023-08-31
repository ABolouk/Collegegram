import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { CommentEntity } from "../comment/entity/comment.entity";
import { TagEntity } from "../tag/entity/tag.entity";
import { UserId } from "../../user/model/user.id";



@Entity("posts")
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: UserId;

  @ManyToOne(() => UserEntity)
  user!: UserEntity

  @Column('varchar', { array: true })
  photos!: string[]

  @Column()
  description?: string

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments?: CommentEntity[]

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags?: TagEntity[]

  @Column('boolean', { default: false })
  closeFriends!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}