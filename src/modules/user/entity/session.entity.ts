import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserId } from "../model/user.id";


@Entity("session")
export class SessionEntity {
    @Column()
    token!: string;

    @OneToOne(() => UserEntity, user => user.id)
    userId!: UserId;

    @Column()
    expireDate!: Date;
}