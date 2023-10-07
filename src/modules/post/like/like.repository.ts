import {DataSource, In, Repository} from "typeorm";
import {LikeEntity} from "./entity/like.entity";
import {zodLike} from "./dao/like.dao";
import {likeInterface} from "./model/like";
import {PostEntity} from "../entity/post.entity";
import {UserId} from "../../user/model/user.id";
import {PostId} from "../model/post-id";

export class LikeRepository {
    private likeRepo: Repository<LikeEntity>;

    constructor(private appDataSource: DataSource) {
        this.likeRepo = appDataSource.getRepository(LikeEntity);
    }

    //TODO: better name
    async create(like: likeInterface): Promise<likeInterface> {
        return await this.appDataSource.manager.transaction(async manager => {
            const postRepo = manager.getRepository(PostEntity);
            const likeRepo = manager.getRepository(LikeEntity);
            const newLike = await likeRepo.save({
                userId: like.userId,
                postId: like.postId
            });
            await postRepo.update(
                {id: like.postId},
                {likeCount: () => "likeCount + 1"}
            );
            return zodLike.parse(newLike);
        });
    }

    async isLiked(like: likeInterface): Promise<likeInterface | null> {
        return this.likeRepo.findOneBy({userId: like.userId, postId: like.postId});
    }

    async delete(like: likeInterface) {
        await this.appDataSource.manager.transaction(async manager => {
            const postRepo = manager.getRepository(PostEntity);
            const likeRepo = manager.getRepository(LikeEntity);
            const deleteLike = await likeRepo.delete({userId: like.userId, postId: like.postId});
            await postRepo.update(
                {id: like.postId},
                {likeCount: () => "likeCount - 1"}
            );
        });
    }

    async blockedUserLike(dto: { blockerId: UserId, blockedId: UserId }) {
        const like = await this.likeRepo.find({
            select: {
                userId: true,
                postId: true,
                post: {
                    userId: true,
                },
            },
            relations: {
                post: true,
            },
            where: [{
                userId: dto.blockerId,
                post: {
                    userId: dto.blockedId,
                }
            }, {
                userId: dto.blockedId,
                post: {
                    userId: dto.blockerId,
                }
            },
            ],
        });
        await this.appDataSource.manager.transaction(async manager => {
            const postRepo = manager.getRepository(PostEntity);
            const likeRepo = manager.getRepository(LikeEntity);
            const newLike = await likeRepo.delete(
                {postId: In(like.map(x => x.postId))}
            );
            await postRepo.update(
                {id: In(like.map(x => x.postId))},
                {likeCount: () => "likeCount - 1"}
            );
        });
        return {status: "blocked"}
    }


}