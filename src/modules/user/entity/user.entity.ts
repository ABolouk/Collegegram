import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserId } from "../model/user.id";
import { Email } from "../model/user.email";
import { Username } from "../model/user.username";
import { FirstName } from "../model/user.firstName";
import { lastName } from "../model/user.lastName";

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
  firstName?: FirstName;

  @Column({ nullable: true })
  lastName?: lastName;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column("boolean", { default: false })
  isPrivate!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
