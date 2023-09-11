import { DataSource, Repository } from "typeorm";
import { UserId } from "./model/user.id";
import { SessionEntity } from "./entity/session.entity";

export class sessionRepository {
    private sessionRepo: Repository<SessionEntity>;
    constructor(appDataSource: DataSource) {
        this.sessionRepo = appDataSource.getRepository(SessionEntity);
    }
    async createSession(token: string, userId: UserId, expireDate: Date) {
        return this.sessionRepo.save({ token, userId, expireDate });
    }
    async findSessionByToken(token: string): Promise<SessionEntity | null> {
        return this.sessionRepo.findOneBy({ token });
    }
    async deleteToken(token: string) {
        return this.sessionRepo.delete({ token });
    }
}