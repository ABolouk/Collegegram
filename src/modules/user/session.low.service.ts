import {sessionRepository} from "./session.repository";
import {UserId} from "./model/user.id";

export class SessionLowService {
    constructor(private sessionRepo: sessionRepository) {
    }

    async createSession(token: string, userId: UserId, expireDate: Date) {
        return this.sessionRepo.createSession(token, userId, expireDate);
    }
        async findSessionByRefreshToken(token: string) {
        return this.sessionRepo.findSessionByRefreshToken(token);
    }

    async deleteToken(token: string) {
        return this.sessionRepo.deleteToken(token);
    }
}