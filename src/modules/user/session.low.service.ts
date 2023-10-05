import {sessionRepository} from "./session.repository";

export class SessionLowService {
    constructor(private sessionRepo: sessionRepository) {
    }

    async findSessionByRefreshToken(token: string) {
        return this.sessionRepo.findSessionByRefreshToken(token);
    }

    async deleteToken(token: string) {
        return this.sessionRepo.deleteToken(token);
    }
}