import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserInterface } from "./model/user";
import { UserId } from "./model/user.id";
import { userName } from "./model/user.username";
import { UserEmail } from "./model/user.email";


export interface createUser {
	email: string,
	username: string,
	password: string
}

export class UserRepository {
	private userRepo: Repository<UserEntity>;
	constructor(appDataSource: DataSource) {
		this.userRepo = appDataSource.getRepository(UserEntity);
	}

	findByUsername(username: userName): Promise<UserEntity | null> {
		return this.userRepo.findOneBy({ username });
	}

	findByEmail(email: UserEmail): Promise<UserEntity | null> {
		return this.userRepo.findOneBy({ email });
	}

	findById(id: UserId): Promise<UserEntity | null> {
		return this.userRepo.findOneBy({ id });
	}
	//FIXME: check async
	updatePasswordById(id: UserId, password: string) {
		this.userRepo.update(
			{ id: id },
			{ password: password },
		)
	}

	createUser(user: UserInterface): Promise<UserEntity> {
		return this.userRepo.save(user)
	}
}