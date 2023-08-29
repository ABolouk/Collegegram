import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../model/user.id";
import { UserEmail } from "../model/user.email";
import { userName } from "../model/user.username";


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
    firsrName?: string;

    @Column({ nullable: true })
    lastName?: string;


    @Column({ nullable: true })
    bio?: string;

    @Column('boolean', { default: false })
    avatar?: string;

    @Column()
    isPrivate!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}