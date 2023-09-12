import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../../user/model/user.id";

@Entity("follow requset")
export class FollowRequestEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    intractionId!: number;

    @Column()
    followerId!: UserId;

    @Column()
    followingId!: UserId;

    //FIXME: status should be enum 
    @Column()
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}