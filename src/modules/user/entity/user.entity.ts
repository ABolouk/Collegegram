import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserId } from "../model/user.id";

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

    @Column({ nullable: true })
    avatar?: string;

    @Column('boolean', { default: false })
    isPrivate!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}
