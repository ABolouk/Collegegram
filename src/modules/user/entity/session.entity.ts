import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity } from "./user.entity";
import { UserId } from "../model/user.id";


@Entity("session")
export class SessionEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    token!: string;

    @Column()
    userId!: UserId;

    @Column()
    expireDate!: Date;
}