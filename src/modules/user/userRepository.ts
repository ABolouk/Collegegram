import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserInterface } from "./model/user";
import { UserId } from "./model/user.id";
import { userName } from "./model/user.username";
import { UserEmail } from "./model/user.email";
import { promises } from "dns";
import { UserOutput, UserOutputFull } from "./dao/user.dao";


export interface createUser{
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

	findById(id: UserId) {
		return this.userRepo.findOneBy({ id });
	}

	async createUser( user: createUser) {
		await this.userRepo.save(user)	
	}
}