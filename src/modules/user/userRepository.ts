import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { CreateUserInterface, updateUser, User } from "./model/user";
import { UserId, zodUserId } from "./model/user.id";
import { Username, zodUserName } from "./model/user.username";
import { Email } from "./model/user.email";
import { z } from "zod";

const zodUserDao = z
  .object({
    id: zodUserId,
    email: Email.zod,
    username: zodUserName,
    isPrivate: z.boolean(),
  })
  .transform((x): User => x);

export class UserRepository {
  private userRepo: Repository<UserEntity>;
  constructor(appDataSource: DataSource) {
    this.userRepo = appDataSource.getRepository(UserEntity);
  }

  findByUsername(username: Username): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }

  async isUniqueEmail(email: Email): Promise<Email.Unique | null> {
    const user = await this.findByEmail(email);
    if (user === null) {
      return email as Email.Unique;
    }
    return null;
  }

  async isUniqueUsername(username: Username): Promise<Username.Unique | null> {
    const user = await this.findByUsername(username);
    if (user === null) {
      return username as Username.Unique;
    }
    return null;
  }

  findByEmail(email: Email): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }

  findByEmailOrUsername(data: Email | Username) {
    return this.userRepo
      .findOneBy([{ email: data }, { username: data }])
      .then((x) => zodUserDao.parse(x));
  }

  findById(id: UserId): Promise<User | null> {
    return this.userRepo
      .findOneBy({ id })
      .then((x) => z.nullable(zodUserDao).parse(x));
  }

  updatePasswordById(id: UserId, password: string) {
    this.userRepo.update({ id: id }, { password: password });
  }

  updateUser(userId: UserId, user: updateUser) {
    this.userRepo.update({ id: userId }, user);
  }

  createUser(user: CreateUserInterface): Promise<User> {
    return this.userRepo.save(user);
  }
}
