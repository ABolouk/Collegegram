import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../model/user.id";
import { UserEmail } from "../model/user.email";
import { userName } from "../model/user.username";
import { firstName } from "../model/user.firstName";
import { lastName } from "../model/user.lastName";


@Entity("users")
export class UserEntity {
    @PrimaryColumn()
    id!: UserId;

    @Column()
    email!: UserEmail;

    @Column()
    username!: userName;

    @Column()
    password!: string;

    @Column({ nullable: true })
    firstName?: firstName;

    @Column({ nullable: true })
    lastName?: lastName;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column('boolean', { default: false })
    isPrivate!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}
