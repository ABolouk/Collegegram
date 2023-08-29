import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserId } from "./model/user.id";
import { userName } from "./model/user.username";
import { UserEmail } from "./model/user.email";
import { seedUser } from "../../seedUser";

export class UserRepository {
	private userRepo: Repository<UserEntity>;
	constructor(appDataSource: DataSource) {
		this.userRepo = appDataSource.getRepository(UserEntity);
		seedUser();
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
}