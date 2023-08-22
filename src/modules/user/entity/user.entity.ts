import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity("users")
export class UserEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    email!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    firsrName?: string;

    @Column()
    lastName?: string;

    @Column()
    bio?: string;

    @Column()
    avatar?: string;

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

}