import {UserRepository} from "./user.repository";
import {Email} from "./model/user.email";
import {UserName} from "./model/user.username";
import {createUserInterface, updateUser, User} from "./model/user";
import {BadRequestError, NotFoundError} from "../../utility/http-errors";
import {UserId} from "./model/user.id";
import {UserFollowingsId} from "../follow/model/follow";

export class UserLowService {
    constructor(private userRepository: UserRepository) {
    }

    async findByEmailOrUsername(data: Email | UserName): Promise<User | null> {
        return this.userRepository.findByEmailOrUsername(data)
    }

    async getUserByUsername(username: UserName) {
        const user = await this.userRepository.findByEmailOrUsername(username);
        if (!user) {
            throw new NotFoundError('User');
        }
        return user;
    }

    async getUserById(userId: string) {

        if (!UserId.is(userId)) {
            throw new BadRequestError("Invalid userId");
        }

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError('User');
        }

        return user;
    }

    async getFamilyNameById(id: UserId) {
        const user = await this.getUserById(id)
        return {firstName: user.firstName, lastName: user.lastName}
    }

    updatePasswordById(id: UserId, password: string) {
        return this.userRepository.updatePasswordById(id, password)
    }

    async updateUser(userId: UserId, user: updateUser) {
        return await this.userRepository.updateUser(userId, user)
    }

    async findById(id: UserId): Promise<User | null> {
        return this.userRepository.findById(id)
    }

    async isUniqueEmail(email: Email): Promise<Email.Unique | null> {
        return this.userRepository.isUniqueEmail(email)
    }

    async isUniqueUserName(username: UserName): Promise<UserName.Unique | null> {
        return this.userRepository.isUniqueUserName(username)
    }

    async createUser(user: createUserInterface) {
        return this.userRepository.createUser(user)
    }

    async getUsersNotFollowingAndNotBlocked(BlockedUsersId: UserId[], BlockerUsersId: UserId[], FollowingUserId: UserFollowingsId , limit: number , startTime: Date) {
        return this.userRepository.getUsersNotFollowedNotblocked(BlockedUsersId ,BlockerUsersId , FollowingUserId , limit , startTime)
    }
}