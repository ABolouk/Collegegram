import {LikeRepository} from "./like.repository";
import {likeInterface} from "./model/like";
import {UserId} from "../../user/model/user.id";

export class LikeLowService {
    constructor(private likeRepository: LikeRepository) {
    }

    async create(like: likeInterface): Promise<likeInterface> {
        return await this.likeRepository.create(like);
    }

    async isLiked(like: likeInterface): Promise<likeInterface | null> {
        return this.likeRepository.isLiked(like);
    }

    async delete(like: likeInterface) {
        await this.likeRepository.delete(like);
    }

    async blockedUserLike(dto: { blockerId: UserId, blockedId: UserId }) {
        return this.likeRepository.blockedUserLike(dto);
    }

}