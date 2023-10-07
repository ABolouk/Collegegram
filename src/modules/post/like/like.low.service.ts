import {LikeRepository} from "./like.repository";
import {likeInterface} from "./model/like";
import {UserId} from "../../user/model/user.id";
import { PostId } from "../model/post-id";

export class LikeLowService {
    constructor(private likeRepository: LikeRepository) {
    }

    async create(like: likeInterface): Promise<likeInterface> {
        return await this.likeRepository.create(like);
    }

    async isLiked(like: likeInterface): Promise<boolean> {
        const isliked = await this.likeRepository.isLiked(like);
        if (!isliked) {
            return false
        }
        return true
    }

    async delete(like: likeInterface) {
        await this.likeRepository.delete(like);
    }

    async blockedUserLike(dto: { blockerId: UserId, blockedId: UserId }) {
        return this.likeRepository.blockedUserLike(dto);
    }

}