import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { CreateUserInterface, User} from "./model/user";
import { UserId } from "./model/user.id";
import { userName } from "./model/user.username";
import { UserEmail } from "./model/user.email";


export class UserRepository {
	private userRepo: Repository<UserEntity>;
	constructor(appDataSource: DataSource) {
		this.userRepo = appDataSource.getRepository(UserEntity);
	}

	findByUsername(username: userName): Promise<User | null> {
		return this.userRepo.findOneBy({ username });
	}

	findByEmail(email: UserEmail): Promise<User| null> {
		return this.userRepo.findOneBy({ email });
	}

	findById(id: UserId): Promise<User | null> {
		return this.userRepo.findOneBy({ id });
	}
	//FIXME: check async
	updatePasswordById(id: UserId, password: string) {
		this.userRepo.update(
			{ id: id },
			{ password: password },
		)
	}

	createUser(user: CreateUserInterface): Promise<User> {
		return this.userRepo.save(user)
	}
}