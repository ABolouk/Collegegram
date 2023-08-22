import { UserEntity } from "./entity/user.entity";
import { UserInterface } from "./model/user";
import { UserId } from "./model/user.id";

export class UserRepository {
	private userRepo: Repository<UserEntity>;
	constructor(appDataSource: DataSource) {
		this.userRepo = appDataSource.getRepository(UserEntity);
	}

	findByUsername(username: string): Promise<UserInterface | null> {
		return this.userRepo.findOneBy({ username });
	}

    findByEmail(email: string): Promise<UserInterface | null> {
		return this.userRepo.findOneBy({ email });
	}

	findById(id: UserId) {
		return this.userRepo.findOneBy({ id });
	}
}