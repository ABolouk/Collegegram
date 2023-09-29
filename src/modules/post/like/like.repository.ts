import {DataSource, Repository} from "typeorm";
import {LikeEntity} from "./entity/like.entity";
import {zodLike} from "./dao/like.dao";
import {likeInterface} from "./model/like";
import {PostEntity} from "../entity/post.entity";

export class LikeRepository {
    private likeRepo: Repository<LikeEntity>;

    constructor(private appDataSource: DataSource) {
        this.likeRepo = appDataSource.getRepository(LikeEntity);
    }

    //TODO: better name
    async create(like: likeInterface): Promise<likeInterface> {
        return new Promise<likeInterface>(async (resolve, reject) => {
            try {
                await this.appDataSource.manager.transaction(async manager => {
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
                    resolve(newLike);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async isLiked(like: likeInterface): Promise<likeInterface | null> {
        return this.likeRepo.findOneBy({userId: like.userId, postId: like.postId});
    }

    async delete(like: likeInterface) {
        await this.appDataSource.manager.transaction(async manager => {
            const postRepo = manager.getRepository(PostEntity);
            const likeRepo = manager.getRepository(LikeEntity);
            const newLike = await likeRepo.delete({userId: like.userId, postId: like.postId});
            await postRepo.update(
                {id: like.postId},
                {likeCount: () => "likeCount - 1"}
            );
        });
    }
}