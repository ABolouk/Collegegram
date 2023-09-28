import {DataSource, Repository} from "typeorm";
import {LikeEntity} from "./entity/like.entity";
import {zodLike} from "./dao/like.dao";
import {likeInterface} from "./model/like";

export class LikeRepository {
    private likeRepo: Repository<LikeEntity>;

    constructor(appDataSource: DataSource) {
        this.likeRepo = appDataSource.getRepository(LikeEntity);
    }
    //TODO: better name
    async create(like: likeInterface): Promise<likeInterface> {
        return this.likeRepo.save(like).then((x) => zodLike.parse(x));
    }

    async isLiked(like: likeInterface): Promise<likeInterface | null> {
        return this.likeRepo.findOneBy({userId: like.userId, postId: like.postId});
    }

    async delete(like: likeInterface): Promise<void> {
        await this.likeRepo.delete({userId: like.userId, postId: like.postId});
    }



}