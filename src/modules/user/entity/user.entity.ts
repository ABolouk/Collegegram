import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../model/user.id";
import { WholeNumber } from "../../../data/whole-number";

@Entity("users")
export class UserEntity {
    @PrimaryColumn()
    id!: UserId;

    @Column()
    email!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true  , default: "https://collegegram-avatars.darkube.app/default-avatar.png"})
    avatar?: string;

    @Column('boolean', { default: false })
    isPrivate!: boolean;

    @Column({default: 0})
    postCount!: WholeNumber;

    @Column({default: 0})
    followerCount!: WholeNumber;

    @Column({default: 0})
    followingCount!: WholeNumber;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}
