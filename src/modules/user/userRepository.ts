import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserId } from "./model/user.id";
import { userName } from "./model/user.username";
import { UserEmail } from "./model/user.email";
import { seedUser } from "../../seedUser";

export interface createUser{
	email: UserEmail,
	username: UserId,
	password: string				
}

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

	createUser( user: createUser): Promise<UserEntity> {
		return this.userRepo.save(user)	
	}
}